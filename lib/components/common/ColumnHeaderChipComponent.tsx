import { Chip, ChipProps } from "@mui/material";
import { GlobeIcon, BooksIcon } from "../../icons/index.tsx";
import { getType } from "../../helpers/rowHelpers.ts";
import { EntityType } from "../../models.ts";
import { useDataContext } from "../../contexts/data/DataContext.ts";

const ColumnHeaderChipComponent = ({ variableName }: { variableName: string }) => {
    const { datasetMapping, headerIndexes } = useDataContext();

    const row = datasetMapping[variableName];
    const entityType = getType(row, headerIndexes);

    let color: ChipProps['color'];
    let iconColor: string;

    switch (entityType) {
        case EntityType.CDE:
            color = "success";
            iconColor = "#027A48";
            break;
        case EntityType.CustomDictionaryField:
            color = "secondary";
            iconColor = "#5925DC";
            break;
        default:
            color = "default";
            iconColor = "#676C74";
            break;
    }

    return (
        <Chip
            label={variableName}
            size="small"
            color={color}
            icon={
                entityType === EntityType.CDE ? <GlobeIcon color={iconColor} /> : <BooksIcon color={iconColor}/>
            }
        />
    );
};

export default ColumnHeaderChipComponent;
