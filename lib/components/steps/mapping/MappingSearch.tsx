import React, {useState} from "react";
import {Box, Button, InputAdornment, TextField} from "@mui/material";
import {FilterIcon, SearchIcon} from "../../../icons";
import Filters from "../../common/Filters.tsx";


interface MappingSearchProps {
    onChange: () => void;
}

export default function MappingSearch({onChange}: MappingSearchProps) {

    const [searchString, setSearchString] = useState('');

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchString(event.target.value);
        onChange()
    };

    const handleFiltersClose = () => {
        setAnchorEl(null);
        onChange()
    };
    const open = Boolean(anchorEl);
    const id = open ? 'filter-popover' : undefined;


    return <Box alignItems="center" display="flex" gap={1.5} mb={3}>
        <TextField
            fullWidth
            variant="outlined"
            placeholder="Search column headers or mapped CDEs..."
            InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>
            }}
            value={searchString}
            onChange={handleSearchChange}
        />
        <Button
            variant="outlined"
            onClick={handleFiltersClose}
        >
            <FilterIcon/>
            Filter
        </Button>

        <Filters anchorEl={anchorEl} handleClose={handleFiltersClose} open={open} id={id}/>
    </Box>;
}