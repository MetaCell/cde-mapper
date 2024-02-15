import {Box, Typography} from '@mui/material';
import {ArrowIcon, GlobeIcon} from '../../icons/index.tsx';
import CdeDetails from '../common/CdeDetails.tsx';
import {vars} from '../../theme/variables.ts';
import {Entity} from "../../models.ts";
import {getCleanUrl} from "../../helpers/functions.ts";
import StyledRadio from '../common/StyledRadio.tsx';

const {
    gray900,
    gray200,
    gray500,
    gray300,
    primary600
} = vars;

type SuggestionDetailUIProps = {
    entity: Entity;
}


function SuggestionDetailUI({entity}: SuggestionDetailUIProps) {

    // Deconstruct the fixed properties from row
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { variableName, preciseAbbrev, title, interlexId, type, ...otherProps } = entity;

    // Get the first 4 non-empty dynamic attributes
    const dynamicAttributes = Object.entries(otherProps)
        .filter(([, value]) => value !== '')
        .slice(0, 4)
        .map(([key, value]) => ({
            heading: key,
            text: value,
        }));

    // Combine the fixed and dynamic attributes
    const rowContent = [
        { heading: 'Variable Name', text: variableName },
        { heading: 'Precise Abbreviation', text: preciseAbbrev },
        { heading: 'Title', text: title },
        { heading: 'Interlex ID', text: interlexId, link: getCleanUrl(interlexId)},
        ...dynamicAttributes,
    ];

    return (
        <Box gap='1.5rem' display='flex' alignItems='start'>
            <Box height='2.625rem' display='flex' alignItems='center' sx={{"& .MuiRadio-root": {
                                padding: 0,
                                color: gray300,
                                marginRight: '0.75rem',
                                marginLeft: '0.6rem',
                                '&.Mui-checked': {
                                    color: primary600
                                }
                            },}}>
                <StyledRadio/>
            </Box>
            <Box flex={1}>
                <Box gap='1.5rem' display='flex' alignItems='center' mb='0.75rem'>
                    <ArrowIcon/>

                    <Box flex={1} sx={{
                        padding: '0.625rem 0.875rem',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        border: `0.0625rem solid ${gray200}`,
                    }}>
                        <GlobeIcon/>
                        <Typography sx={{
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            lineHeight: '142.857%',
                            color: gray900
                        }}>
                            {preciseAbbrev}
                        </Typography>
                        <Typography sx={{
                            fontSize: '0.875rem',
                            fontWeight: 400,
                            lineHeight: '142.857%',
                            color: gray500
                        }}>
                            {title}
                        </Typography>
                    </Box>
                </Box>
                <CdeDetails data={rowContent}/>
            </Box>
        </Box>
    );
}

export default SuggestionDetailUI;
