import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import {useRadioGroup} from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import StyledRadio from './StyledRadio';
import {vars} from '../../theme/variables';

const {baseWhite, primary50, primary600, primary800, gray100, gray300, gray500, gray700} = vars

interface StyledCardProps {
    value: string;
    isSuggested?: boolean;
    selectedValue: string;
    onChange: (value: string, selectedValue: string) => void;
    onAfterChange: () => void;
}

const StyledCard: React.FC<StyledCardProps> = ({value, isSuggested, selectedValue, onChange}) => {
    const radioGroup = useRadioGroup();
    let checked = false;

    if (radioGroup) {
        checked = radioGroup.value === value;
    }

    const handleRadioChange = () => {
        onChange(value, selectedValue);
    }

    return (
        <Box sx={{minWidth: 320}}>
            <Card
                variant="outlined"
                sx={{
                    border: checked ? `0.0938rem solid ${primary600}` : `0.0625rem solid ${gray100}`,
                    borderRadius: '0.5rem',
                    backgroundColor: checked ? primary50 : baseWhite
                }}
            >
                <CardActionArea onClick={handleRadioChange}>
                    <CardContent
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingLeft: '1.5rem',
                            "&:last-child": {
                                paddingBottom: "1rem"
                            },
                            "& .MuiRadio-root": {
                                padding: 0,
                                color: gray300,
                                marginRight: '0.75rem',
                                marginLeft: '0.6rem',
                                '&.Mui-checked': {
                                    color: primary600
                                }
                            },
                            "& .MuiTypography-body1": {
                                color: checked ? primary800 : gray700,
                                fontWeight: 500,
                                fontSize: '0.875rem',
                                lineHeight: '1.25rem'
                            }
                        }}
                    >
                        <FormControlLabel value={value} control={<StyledRadio checked={selectedValue === value}
                                                                        onChange={handleRadioChange}/>} label={value}/>
                        {isSuggested && <Typography variant="caption" sx={{color: gray500}}>
                            Suggested
                        </Typography>}
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
}
export default StyledCard;