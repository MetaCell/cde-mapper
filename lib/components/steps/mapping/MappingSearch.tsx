import React, {useState} from "react";
import {Box, Button, InputAdornment, TextField} from "@mui/material";
import {FilterIcon, SearchIcon} from "../../../icons";
import Filters from "../../common/Filters.tsx";
import { useDebounce } from "../../../hooks/useDebounce.ts";
import { EntityType, FiltersState } from "../../../models.ts";

interface MappingSearchProps {
    onChange: (searchTerm: string, checked: FiltersState) => void;
}

export default function MappingSearch({onChange}: MappingSearchProps) {

    const [searchString, setSearchString] = useState('');
    const [filtersState, setFiltersState] = React.useState({
        [EntityType.CDE]: false,
        [EntityType.CustomDictionaryField]: false,
        [EntityType.Unknown]: false,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiltersState({
            ...filtersState,
            [event.target.name]: event.target.checked,
        });
    };

    const handleReset = () => {
        setFiltersState({
            [EntityType.CDE]: false,
            [EntityType.CustomDictionaryField]: false,
            [EntityType.Unknown]: false
        })
    };

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const debouncedSearchValue = useDebounce(searchString);

    const handleFiltersClose = () => {
        setAnchorEl(null);
    };

    const handleFiltersOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'filter-popover' : undefined;

    React.useEffect(() => {
        onChange(debouncedSearchValue, filtersState);
    }, [debouncedSearchValue, filtersState, onChange])


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
            onClick={handleFiltersOpen}
        >
            <FilterIcon/>
            Filter
        </Button>

        <Filters anchorEl={anchorEl} handleClose={handleFiltersClose} open={open} id={id} checked={filtersState} onChange={handleChange} onReset={handleReset}/>
    </Box>;
}