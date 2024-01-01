import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import {useRadioGroup} from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import vars from '../assets/styles/variables';

const { palette } = vars

interface StyledCardProps {
    value: string;
    isSuggested?: boolean;
}

const StyledCard: React.FC<StyledCardProps> = ({ value, isSuggested }) => {

    const radioGroup = useRadioGroup();
    let checked = false;

    if (radioGroup) {
        checked = radioGroup.value === value;
    }

    return (
        <Box sx={{ minWidth: 320 }}>
            <Card 
                variant="outlined"
                sx={{
                    border: checked ? `1.5px solid ${palette.primary[600]}` : `1px solid ${palette.grey[100]}`,
                    borderRadius: '0.5rem',
                    backgroundColor: checked ? palette.primary[50] : '#fff'
                }}
            >
                <CardContent
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        "&:last-child": {
                            paddingBottom: "1rem"
                        },
                        "& .MuiRadio-root": {
                            padding: 0,
                            color: palette.grey[300],
                            marginRight: '0.75rem',
                            marginLeft: '0.6rem'
                        },
                        "& .MuiTypography-body1": {
                            color: checked ? palette.primary[800] : palette.grey[700],
                            fontWeight: 500,
                            fontSize: '0.875rem'
                        }
                    }}
                >
                    <FormControlLabel value={value} control={<Radio size="small"/>} label={value}/>
                    {isSuggested && <Typography variant="caption" sx={{ color: palette.grey[500] }}>
                        Suggested
                    </Typography>}
                </CardContent>
            </Card>
        </Box>
    );
}
export default StyledCard;