import {
    ABBREVIATION, CDE_LEVEL, CDE_LEVEL_CDE_KEY,
    DATA_TYPE, DATA_TYPE_CDE_KEY, DESCRIPTION,
    INTERLEX_ID, MAXIMUM_VALUE, MAXIMUM_VALUE_CDE_KEY,
    MINIMUM_VALUE, MINIMUM_VALUE_CDE_KEY,
    PERMITTED_VALUES, PERMITTED_VALUES_CDE_KEY,
    TITLE,
    UNIT_OF_MEASURE, UNIT_OF_MEASURE_CDE_KEY
} from "../settings.ts";
import {HeaderIndexes, Option, OptionDetail} from "../models.ts";
import {getId, getPreciseAbbreviation} from "./getters.ts";


type Hit = {
    _source: {
        synonyms: { type: string; literal?: string }[];
        label?: string;
        ilx: string;
        annotations: { annotation_term_label: string; value?: string }[];
        definition?: string;
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
            {title: DESCRIPTION, value: source.definition ?? ''}
        ];

        const annotationMapping: { [key: string]: string } = {
            [UNIT_OF_MEASURE_CDE_KEY]: UNIT_OF_MEASURE,
            [DATA_TYPE_CDE_KEY]: DATA_TYPE,
            [PERMITTED_VALUES_CDE_KEY]: PERMITTED_VALUES,
            [MINIMUM_VALUE_CDE_KEY]: MINIMUM_VALUE,
            [MAXIMUM_VALUE_CDE_KEY]: MAXIMUM_VALUE,
            [CDE_LEVEL_CDE_KEY]: CDE_LEVEL,
        };

        Object.entries(annotationMapping).forEach(([termLabel, title]) => {
            const value = source.annotations.find(a => a.annotation_term_label === termLabel)?.value;
            if (value) {
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
