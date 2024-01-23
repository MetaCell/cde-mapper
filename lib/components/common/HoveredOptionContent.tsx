import {Stack, Typography, Box} from '@mui/material';
import {vars} from '../../theme/variables';

const {
    gray400,
    gray700
} = vars;

const DefaultBody = ({entity}: any) => (
    <Stack spacing={2} flexGrow={1}>
        {entity?.content?.map((detail: any, i: number) => <Stack spacing={1} sx={{mt: i !== 0 ? 3 : 0}}>
            <Typography variant="body1">
                {detail?.title}
            </Typography>
            <Typography variant="body2">{detail?.value}</Typography>
        </Stack>)}
    </Stack>
);

const HoveredOptionContent = ({
                                  entity,
                                  HeaderComponent,
                                  BodyComponent,
                                  FooterComponent,
                                  padding
                              }: any) => {
    return (
        <Box
            width={1}
            p={padding ?? 3}
            display='flex'
            flexDirection='column'
            minHeight={1}
            sx={{
                boxSizing: 'border-box',
                '& .MuiTypography-body1': {
                    color: gray400,
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    lineHeight: "1.125rem",
                },

                '& .MuiTypography-body2': {
                    color: gray700,
                    fontSize: "0.875rem",
                    fontWeight: 400,
                    lineHeight: "1.25rem",
                    marginTop: '0.25rem',
                },

                '& .MuiOutlinedInput-input': {
                    height: '1.75rem'
                },

                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'transparent'
                },

                '& .MuiOutlinedInput-root': {
                    paddingLeft: '0.25rem',
                    borderRadius: '0.25rem',

                    '&:not(.Mui-focused):hover': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'transparent'
                        }
                    },

                    '&.Mui-focused': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'transparent'
                        }
                    }
                }
            }}
        >
            {HeaderComponent && <HeaderComponent entity={entity}/>}
            {BodyComponent ? <BodyComponent entity={entity}/> : <DefaultBody entity={entity}/>}
            {FooterComponent && <FooterComponent entity={entity}/>}
        </Box>
    );
};

export default HoveredOptionContent;
