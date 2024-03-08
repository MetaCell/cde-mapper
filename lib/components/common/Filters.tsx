import React from 'react';
import { Popover, Box, Typography, Button, FormGroup } from '@mui/material';
import Checkbox from "../common/CheckBox";
import { EntityType } from '../../models';

interface FiltersProps {
    anchorEl: Element | null;
    handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
    open: boolean;
    id: string | undefined;
}

const Filters: React.FC<FiltersProps> = ({ anchorEl, handleClose, open, id }) => {
    const [checked, setChecked] = React.useState({
        [EntityType.CDE]: false,
        [EntityType.CustomDataDictionary]: false,
        [EntityType.Unknown]: false,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked({
            ...checked,
            [event.target.name]: event.target.checked,
        });
    }

    const handleAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked({
            [EntityType.CDE]: event.target.checked,
            [EntityType.CustomDataDictionary]: event.target.checked,
            [EntityType.Unknown]: event.target.checked
        })
    }

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <Box sx={{
                borderBottom: '0.0625rem solid #ECEDEE',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Typography sx={{
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    lineHeight: '150%',
                    color: '#676C74'
                }}>Filter by</Typography>
                <Button
                    variant="text"
                    sx={{
                        p: 0,
                        fontSize: '0.75rem',
                        '&:hover': {
                            background: 'transparent'
                        }
                    }}
                >
                    Reset filters
                </Button>
            </Box>

            <Box p='1rem' sx={{ borderBottom: '0.0625rem solid #ECEDEE' }}>
                <Typography sx={{
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    lineHeight: '150%',
                    color: '#676C74',
                    mb: '0.75rem'
                }}>Status</Typography>
                <Checkbox
                    label="All"
                    checked={checked[EntityType.CDE] && checked[EntityType.CustomDataDictionary] && checked[EntityType.Unknown]}
                    onChange={handleAllChange}
                />

                <Box pl={3} mt="0.75rem" sx={{
                    position: 'relative',
                    '&:before': {
                        content: '""',
                        width: '0.0625rem',
                        height: '100%',
                        background: '#ECEDEE',
                        position: 'absolute',
                        top: 0,
                        left: '0.4688rem'
                    }
                }}>
                    <FormGroup>
                        <Checkbox checked={checked[EntityType.CDE]} onChange={handleChange} name={EntityType.CDE} label="Mapped to CDE" />
                        <Checkbox checked={checked[EntityType.CustomDataDictionary]} onChange={handleChange} name={EntityType.CustomDataDictionary} label="Mapped to Data Dictionary field" />
                        <Checkbox checked={checked[EntityType.Unknown]} onChange={handleChange} name={EntityType.Unknown} label="Unmapped" />
                    </FormGroup>
                </Box>
            </Box>
            <Box p='1rem' sx={{ borderBottom: '0.0625rem solid #ECEDEE' }}>
                <Typography
                    sx={{ fontSize: '0.75rem', fontWeight: 500, lineHeight: '150%', color: '#676C74', mb: '0.75rem' }}>Type
                    of mapping</Typography>
                <Checkbox label="All" />
                <Box pl={3} mt="0.75rem" sx={{
                    position: 'relative',
                    '&:before': {
                        content: '""',
                        width: '0.0625rem',
                        height: '100%',
                        background: '#ECEDEE',
                        position: 'absolute',
                        top: 0,
                        left: '0.4688rem'
                    }
                }}>
                    <FormGroup>
                        <Checkbox label="Mapped to CDE" />
                        <Checkbox label="Mapped to Data Dictionary field" />
                        <Checkbox label="Unmapped" />
                    </FormGroup>
                </Box>
            </Box>

            <Box sx={{
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Checkbox label="Hide previously mapped columns" />
            </Box>
        </Popover>
    )
}

export default Filters;