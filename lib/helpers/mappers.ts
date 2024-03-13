import {
    ABBREVIATION, CDE_LEVEL,
    DATA_TYPE,
    INTERLEX_ID, MAXIMUM_VALUE,
    MINIMUM_VALUE,
    PERMITTED_VALUES,
    TITLE,
    UNIT_OF_MEASURE
} from "../settings.ts";
import {HeaderIndexes, Option, OptionDetail} from "../models.ts";
import {getId, getPreciseAbbreviation} from "./getters.ts";


type Hit = {
    _source: {
        synonyms: { type: string; literal?: string }[];
        label?: string;
        ilx: string;
        annotations: { annotation_term_label: string; value?: string }[];
    };
};

export function mapElasticSearchHitsToOptions(hits: Hit[]): Option[] {
    return hits.filter(hit => hit._source.ilx).map(hit => {
        const source = hit._source;
        const id = source.ilx;
        const preciseAbbrev = source.synonyms.find(s => s.type === 'abbrev')?.literal ||
            (source.label ? source.label.substring(0, 5) + "_" + id : id);

        const details: OptionDetail[] = [
            {title: ABBREVIATION, value: preciseAbbrev},
            {title: TITLE, value: source.label ?? ''},
            {title: INTERLEX_ID, value: id},
        ];

        const annotationMapping: { [key: string]: string } = {
            'has unit': UNIT_OF_MEASURE,
            'allowedType': DATA_TYPE,
            'allowedValues': PERMITTED_VALUES,
            'minValue': MINIMUM_VALUE,
            'maxValue': MAXIMUM_VALUE,
            'hasCDELevel': CDE_LEVEL
        };

        Object.entries(annotationMapping).forEach(([termLabel, title]) => {
            const value = source.annotations.find(a => a.annotation_term_label === termLabel)?.value;
            if (value){
                details.push({title, value});
            }
        });

        return {
            id,
            label: preciseAbbrev,
            group: '',
            content: details,
        };
    });
}

export const mapRowToOption = (row: string[], header: string[], headerIndexes: HeaderIndexes): Option => {
    const id = getId(row, headerIndexes)
    const label = getPreciseAbbreviation(row, headerIndexes) || id

    const content = row.map((value: string, i: number) => ({
        title: header[i],
        value
    }))

    return {id, label, group: '', content}
};
