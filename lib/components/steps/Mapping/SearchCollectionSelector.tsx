import {useState} from 'react';
import {Box, ListSubheader, Typography} from '@mui/material';
import {CheckIcon, DownIcon} from "../../../icons";
import {SelectableCollection} from "../../../models.ts";



interface SearchCollectionSelectorProps {
    collections: SelectableCollection[];
    onCollectionSelect: (collection: SelectableCollection) => void;
}

export default function SearchCollectionSelector(props: SearchCollectionSelectorProps) {
    const [toggleMenu, setToggleMenu] = useState(false);

    return <Box>
        <ListSubheader
            component="div"
            onClick={() => setToggleMenu(!toggleMenu)}
            style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                justifyContent: "space-between",
            }}
        >
            <Typography
                sx={{
                    color: "#373A3E",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    lineHeight: "1.125rem",
                }}
            >
                {props.collections.find(collection => collection.selected)?.name || 'Select a Collection'}
            </Typography>
            <DownIcon/>
            {toggleMenu && (
                <Box sx={{
                    borderRadius: "0.5rem",
                    overflow: "hidden",
                    position: "absolute",
                    width: "calc(100% - 1.875rem)",
                    top: "2.125rem",
                    left: "0.9375rem",
                    border: "0.0625rem solid #E4E5E7",
                    background: "#FFF",
                    boxShadow: "0rem 0.25rem 0.375rem -0.125rem rgba(7, 8, 8, 0.03), 0rem 0.75rem 1rem -0.25rem rgba(7, 8, 8, 0.08)",
                }}>
                    <ul className="simple-list">
                        {props.collections.map(collection => (
                            <li key={collection.id} onClick={() => {
                                props.onCollectionSelect(collection);
                                setToggleMenu(false);
                            }}>
                                <Typography
                                    sx={{width: 1, height: 1, padding: "0.625rem"}}
                                >
                                    {collection.name}
                                </Typography>
                                {collection.selected && <CheckIcon color="#19418F"/>}
                            </li>
                        ))}
                    </ul>
                </Box>
            )}
        </ListSubheader>
    </Box>;
}
