import {Box, Typography} from '@mui/material';
import {ArrowIcon, GlobeIcon} from '../../../icons';
import CdeDetails from '../../common/CdeDetails.tsx';
import {vars} from '../../../theme/variables.ts';
import {getCleanUrl} from "../../../helpers/utils.ts";
import {EntityType, HeaderIndexes} from "../../../models.ts";
import StyledRadio from '../../common/StyledRadio.tsx';
import {getType} from "../../../helpers/getters.ts";

const {
    gray900,
    gray200,
    gray500,
    gray300
} = vars;

type SuggestionDetailUIProps = {
    row: string[];
    header: string[]
    headerIndexes: HeaderIndexes
    isSelected: boolean
    onSelect: () => void
}


function SuggestionDetailUI({row, header, headerIndexes, isSelected, onSelect}: SuggestionDetailUIProps) {

    const rowContent = header.map((heading, index) => ({
        heading: heading,
        text: row[index],
        link: index === headerIndexes.id && getType(row, headerIndexes) == EntityType.CDE ?
            getCleanUrl(row[index]) : ''
    }));

    return (
        <Box gap='1.5rem' display='flex' alignItems='start'>
            <Box height='2.625rem' display='flex' alignItems='center' sx={{
                "& .MuiRadio-root": {
                    padding: 0,
                    color: gray300
                },
            }}>
                <StyledRadio
                    checked={isSelected}
                    onChange={onSelect}
                />
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
                            {row[headerIndexes.preciseAbbreviation]}
                        </Typography>
                        <Typography sx={{
                            fontSize: '0.875rem',
                            fontWeight: 400,
                            lineHeight: '142.857%',
                            color: gray500
                        }}>
                            {row[headerIndexes.title]}
                        </Typography>
                    </Box>
                </Box>
                <CdeDetails data={rowContent}/>
            </Box>
        </Box>
    );
}

export default SuggestionDetailUI;
