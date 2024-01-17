import { Box, Typography, Grid, Link } from "@mui/material";
import { LinkIcon } from "../../icons";
import { vars } from "../../theme/variables";

const {
    gray700,
    gray200,
    gray500,
    gray900,
    primary500
} = vars;

const DEFAULT_DATA = [
    {
        heading: 'CDE Abbrev',
        text: 'SmallSpeciesStrainTyp'
    },
    {
        heading: 'VariableName',
        text: 'Strain'
    },
    {
        heading: 'Title',
        text: 'Strain of the mouse'
    },
    {
        heading: 'Description',
        text: 'Strain of the mouse'
    },
    {
        heading: 'Unit of measure',
        text: '-'
    },
    {
        heading: 'Data type',
        text: 'Alphanumeric'
    },
    {
        heading: 'Comments',
        text: '-'
    },
    {
        heading: 'InterLex ID',
        text: 'CDE:0369382',
        link: true
    }
]

const CdeDetails = ({ heading = 'CDE Details', data = DEFAULT_DATA }: any) => {
    return (
        <Box sx={{
            border: `0.0625rem solid ${gray200}`,
            borderRadius: '0.5rem'
        }}>
            <Typography sx={{
                fontSize: '0.75rem',
                fontWeight: 500,
                lineHeight: '150%',
                color: gray700,
                padding: '0.625rem 0.875rem',
                borderBottom: `0.0625rem solid ${gray200}`,
            }}>
                {heading}
            </Typography>

            <Box p="0.875rem">
                <Grid container spacing='1.5rem'>
                    {data.map((item: any) => (
                        <Grid item md={3}>
                            <Typography sx={{
                                color: gray500,
                                fontWeight: 400,
                                lineHeight: '150%',
                                marginBottom: '0.25rem',
                                fontSize: '0.75rem',
                            }}>
                                {item.heading}
                            </Typography>
                            <Typography sx={{
                                color: gray900,
                                fontWeight: 400,
                                lineHeight: '142.857%',
                                fontSize: '0.875rem',
                                '& a': {
                                    color: primary500,
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem'
                                }
                            }}>
                                {item?.link ? <Link>{item.text}<LinkIcon /></Link> : item.text}
                            </Typography>

                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
};

export default CdeDetails;