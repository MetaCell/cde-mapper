import {
    ABBREVIATION, CDE_LEVEL, CDE_LEVEL_CDE_KEY,
    DATA_TYPE, DATA_TYPE_CDE_KEY, DESCRIPTION,
    INTERLEX_ID, MAXIMUM_VALUE, MAXIMUM_VALUE_CDE_KEY,
    MINIMUM_VALUE, MINIMUM_VALUE_CDE_KEY,
    PERMITTED_VALUES, PERMITTED_VALUES_CDE_KEY,
    TITLE,
    UNIT_OF_MEASURE, UNIT_OF_MEASURE_CDE_KEY, VARIABLE_NAME_UI
} from "../settings.ts";
import {HeaderIndexes, Option} from "../models.ts";
import {getId, getPreciseAbbreviation} from "./rowHelpers.ts";


type Hit = {
    _source: {
        synonyms: { type: string; literal?: string }[];
        label?: string;
        ilx: string;
        annotations: { annotation_term_label: string; value?: string }[];
        definition?: string;
    };
};

interface AnnotationMapping {
    [key: string]: string;
    [UNIT_OF_MEASURE_CDE_KEY]: string,
    [DATA_TYPE_CDE_KEY]: string,
    [PERMITTED_VALUES_CDE_KEY]: string,
    [MINIMUM_VALUE_CDE_KEY]: string,
    [MAXIMUM_VALUE_CDE_KEY]: string,
}

const annotationMapping : AnnotationMapping = {
    [UNIT_OF_MEASURE_CDE_KEY]: UNIT_OF_MEASURE,
    [DATA_TYPE_CDE_KEY]: DATA_TYPE,
    [PERMITTED_VALUES_CDE_KEY]: PERMITTED_VALUES,
    [MINIMUM_VALUE_CDE_KEY]: MINIMUM_VALUE,
    [MAXIMUM_VALUE_CDE_KEY]: MAXIMUM_VALUE,
};

export function mapElasticSearchHitsToOptions(hits: Hit[], headerIndexes: HeaderIndexes): Option[] {
    return hits.filter(hit => hit._source.ilx).map(hit => {
        const source = hit._source;
        const id = source.ilx;
        const preciseAbbrev = source.synonyms.find(s => s.type === 'abbrev')?.literal ||
            (source.label ? source.label.substring(0, 5) + "_" + id : id);

        // Pre-fill the details array with mandatory fields at specified indexes
        const maxIndex = Math.max(...Object.values(headerIndexes));
        const details = Array(maxIndex + 1).fill(null);
        details[headerIndexes.preciseAbbreviation] = {title: ABBREVIATION, value: preciseAbbrev};
        details[headerIndexes.title] = {title: TITLE, value: source.label ?? ''};
        details[headerIndexes.id] = {title: INTERLEX_ID, value: id};
        details[headerIndexes.variableName] = { title: VARIABLE_NAME_UI, value: '' }

        // Description and other relevant but non-mandatory fields

        const description = source.definition || null
        if(description){
            const firstNullIndex = details.findIndex(detail => detail === null);
            if (firstNullIndex !== -1) {
                details[firstNullIndex] = { title: DESCRIPTION, value: description };
            } else {
                details.push({ title: DESCRIPTION, value: description });
            }
        }

        source.annotations.forEach(annotation => {
            const title = annotationMapping[annotation.annotation_term_label] || null;
            if (title) {
                const firstNullIndex = details.findIndex(detail => detail === null);
                if (firstNullIndex !== -1) {
                    details[firstNullIndex] = { title, value: annotation.value };
                } else {
                    details.push({ title, value: annotation.value });
                }
            }

            // Special handling for CDE level
            if (annotation.annotation_term_label === CDE_LEVEL_CDE_KEY) {
                details[headerIndexes.cdeLevel] = { title: CDE_LEVEL, value: annotation.value };
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
