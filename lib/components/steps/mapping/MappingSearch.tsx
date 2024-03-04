import React, {useState} from "react";
import {Box, Button, InputAdornment, TextField} from "@mui/material";
import {FilterIcon, SearchIcon} from "../../../icons";
import Filters from "../../common/Filters.tsx";
import { useDebounce } from "../../../hooks.ts";


interface MappingSearchProps {
    onChange: (searchTerm: string) => void;
}

export default function MappingSearch({onChange}: MappingSearchProps) {

    const [searchString, setSearchString] = useState('');

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const debouncedSearchValue = useDebounce(searchString);

    const handleFiltersClose = () => {
        setAnchorEl(null);
        onChange(debouncedSearchValue)
    };

    const open = Boolean(anchorEl);
    const id = open ? 'filter-popover' : undefined;

    React.useEffect(() => {
        onChange(debouncedSearchValue);
    }, [debouncedSearchValue, onChange])


    return <Box alignItems="center" display="flex" gap={1.5} mb={3}>
        <TextField
            fullWidth
            variant="outlined"
            placeholder="Search column headers or mapped CDEs..."
            InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>
            }}
            value={searchString}
            onChange={(event) => setSearchString(event.target.value)}
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