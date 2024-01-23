import {FormControlLabel} from "@mui/material";
import React from "react"
import {Checkbox as MuiCheckbox} from '@mui/material';
import {CheckboxDefault, CheckboxSelected} from "../../icons";

interface ICheckbox {
    label: string;
    sx?: any
}

const Checkbox: React.FC<ICheckbox> = ({label = '', sx = {}}) => {
    return (
        <FormControlLabel
            sx={sx}
            control={
                <MuiCheckbox
                    disableRipple
                    icon={<CheckboxDefault/>}
                    checkedIcon={<CheckboxSelected/>}
                />
            }
            label={label}
        />
    )
}

export default Checkbox;