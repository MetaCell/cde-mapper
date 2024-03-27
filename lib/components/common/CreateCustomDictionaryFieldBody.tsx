import React, {useState} from 'react';
import {Box, Chip, Stack, TextField, Typography} from '@mui/material';
import {Option, OptionDetail} from '../../models.ts';

interface CreateCustomDictionaryFieldBodyProps {
    entity: Option;
    variableNameIndex: number;
    idIndex: number;
    cdeLevelIndex: number;
    onBlur: (index: number, value: string) => void;
}

const CreateCustomDictionaryFieldBody: React.FC<CreateCustomDictionaryFieldBodyProps> = ({
                                                                                             entity,
                                                                                             variableNameIndex,
                                                                                             idIndex,
                                                                                             cdeLevelIndex,
                                                                                             onBlur,
                                                                                         }) => {

    // Local state to temporarily store input values
    const [tempValues, setTempValues] = useState(() =>
        entity.content.reduce((acc, item, index) => {
            acc[index] = item.value;
            return acc;
        }, {} as { [key: number]: string })
    );

    // Handler to update the tempValues state as the user types
    const handleTempInputChange = (index: number, value: string) => {
        setTempValues(prev => ({...prev, [index]: value}));
    };

    // Handler to commit changes when the TextField loses focus
    const handleBlur = (index: number) => {
        const value = tempValues[index];
        onBlur(index, value);
    };

    return (
        <Box p={3}>
            <Stack spacing={2} flexGrow={1}>
                {/* Variable Name Display */}
                <Stack direction='row' spacing={1} sx={{mt: 0}}>
                    <Stack flexGrow={1}>
                        <Typography variant="body1">{entity.content[variableNameIndex].title}</Typography>
                        <Typography sx={{p: '0.25rem !important'}} variant="body2">
                            {entity.content[variableNameIndex].value}
                        </Typography>
                    </Stack>
                    <Stack>
                        <Chip size='small' variant='filled' color='secondary' label="Data dictionary"/>
                    </Stack>
                </Stack>

                {/* Dynamic Fields */}
                {entity.content.map((detail: OptionDetail, index) => {
                    if (index === idIndex || index === variableNameIndex || index === cdeLevelIndex) {
                        // Skip rendering for ID and variable name
                        return null;
                    }
                    return (
                        <Stack spacing={1} sx={{mt: 3}} key={detail.title}>
                            <Typography variant="body1">{detail.title}</Typography>
                            <TextField
                                fullWidth
                                placeholder="Insert here..."
                                value={tempValues[index]}
                                onChange={e => handleTempInputChange(index, e.target.value)} // Update temp value on change
                                onBlur={() => handleBlur(index)} // Commit changes on blur
                            />
                        </Stack>
                    );
                })}
            </Stack>
        </Box>
    );
};

export default CreateCustomDictionaryFieldBody;
