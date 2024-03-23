import {FormControlLabel, SxProps, Theme} from "@mui/material";
import React from "react"
import {Checkbox as MuiCheckbox} from '@mui/material';
import {CheckboxDefault, CheckboxSelected} from "../../icons";

interface ICheckbox {
    label: string;
    sx?: SxProps<Theme>;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
}

const Checkbox: React.FC<ICheckbox> = ({label = '', sx = {}, checked, onChange, name}) => {
    return (
        <FormControlLabel
            sx={sx}
            control={
                <MuiCheckbox
                    disableRipple
                    icon={<CheckboxDefault/>}
                    checkedIcon={<CheckboxSelected/>}
                    checked={checked}
                    onChange={onChange}
                    name={name}
                />
            }
            label={label}
        />
    )
}

export default Checkbox;