import { Chip, ChipProps } from "@mui/material";
import { BulletIcon } from "../../../icons";
import { getType } from "../../../helpers/rowHelpers.ts";
import { EntityType } from "../../../models";
import {useDataContext} from "../../../contexts/data/DataContext.ts";

const ChipComponent = ({ variableName }: { variableName: string }) => {
    const { datasetMapping, headerIndexes } = useDataContext();

    const row = datasetMapping[variableName];
    const entityType = getType(row, headerIndexes);

    let label: string;
    let color: ChipProps['color'];
    let iconColor: string;

    switch (entityType) {
        case EntityType.CDE:
            label = "Mapped to CDE";
            color = "success";
            iconColor = "#12B76A";
            break;
        case EntityType.CustomDictionaryField:
            label = "Mapped to Custom Data Dictionary";
            color = "success";
            iconColor = "#346DDB";
            break;
        default:
            label = "Unmapped";
            color = "default";
            iconColor = "#676C74";
            break;
    }

    return (
        <Chip
            label={label}
            size="small"
            color={color}
            icon={<BulletIcon color={iconColor}/>}
        />
    );
};

export default ChipComponent;
