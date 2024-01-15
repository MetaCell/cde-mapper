import { Box, Typography, Breadcrumbs, Link, Button, Stack } from '@mui/material';
import { useCdeContext } from "../../CdeContext.tsx";
import { ModalLayout } from "../layout/ModalLayout.tsx";
import { vars } from '../../theme/variables.ts';
import { AddIcon } from '../../icons/index.tsx';

const { gray100, gray500, gray600 } = vars

function TemplateStep() {
    const {
        step
    } = useCdeContext();

    console.log("step: ", step)
    return (
        <ModalLayout>
            <Box display="flex" flexDirection="column" justifyContent="space-between" height={"100vh"}>
                <Box display='flex' flexDirection='column' p={3}>
                    <Box p={1.5} display="flex" flexDirection="column" gap={6}>
                        <Stack>
                            <Typography variant='h6'>Create template</Typography>
                            <Typography sx={{ color: gray600, fontSize: '0.875rem' }}>Generate a template with CDEs or data dictionary fields before data collection for accurate mapping. Start by selecting CDEs to create template with.</Typography>
                        </Stack>

                        <Stack spacing={3}>
                            <Box mt={6} py={1.5} sx={{ borderBottom: `1px solid ${gray100}` }}>
                                <Breadcrumbs
                                    aria-label="breadcrumb"
                                    sx={{
                                        '& .MuiLink-root': {
                                            fontSize: '0.75rem',
                                            color: gray500,
                                            fontWeight: 500
                                        }
                                    }}
                                >
                                    <Link
                                        href="/material-ui/getting-started/installation/"
                                    >
                                        CDE
                                    </Link>
                                    <Link
                                        href="/material-ui/react-breadcrumbs/"
                                        aria-current="page"
                                    >
                                        Data Dictionary field
                                    </Link>
                                </Breadcrumbs>
                            </Box>
                            <Button variant='text' startIcon={<AddIcon />} sx={{ maxWidth: '10.875rem', '&:hover': { backgroundColor: 'transparent', color: gray500 } }}>Add another field</Button>
                        </Stack>
                    </Box>
                </Box>
                <Box px={3} py={2} display="flex" justifyContent="end" gap={1}>
                    <Button variant='text'>Cancel</Button>
                    <Button variant='contained'>Create template</Button>
                </Box>
            </Box>
        </ModalLayout>
    );
}

export default TemplateStep;