import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { vars } from "../../theme/variables";
import { CloseIcon, MapTriFold } from "../../icons";
import Info from "./Info";
import { useCdeContext } from "../../CdeContext";

const { baseWhite, gray100, gray700 } = vars

const styles = {
    root: {
        padding: '0.75rem 1.5rem',
        gap: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        borderBottom: `0.0625rem solid ${gray100}`,
        background: baseWhite,
        position: 'sticky',
        zIndex: 9,
        top: 0,

        '& .MuiTypography-root': {
            fontSize: '0.875rem',
            fontWeight: 600,
            lineHeight: '142.857%',
            color: gray700
        }
    }
}

const Header = (props: { onClose: () => void, isInfoOpen: boolean, setIsInfoOpen: (b: boolean) => void }) => {
    const { onClose, isInfoOpen, setIsInfoOpen } = props
    const { tutorialStep, tutorialSteps, setTutorialSteps } = useCdeContext();

    const handleInfoBtnClick = () => {
        setIsInfoOpen(true);
        if (tutorialSteps["home"].run) {
            setTutorialSteps(prevTutorialSteps => ({
                ...prevTutorialSteps,
                [tutorialStep]: {
                    ...prevTutorialSteps[tutorialStep],
                    stepIndex: prevTutorialSteps[tutorialStep].stepIndex += 1
                }
            }));
        }
    };

    const handleStartTutorial = () => {
        setTutorialSteps(prevTutorialSteps => ({
            ...prevTutorialSteps,
            [tutorialStep]: {
                ...prevTutorialSteps[tutorialStep],
                run: true
            }
        }));
    }
    return (
        <>
            <Box sx={styles.root}>
                <Box display='flex' alignItems='center' flex={1}>
                    <IconButton disableRipple onClick={onClose} sx={{
                        borderRadius: '0.5rem',

                        '&:hover': {
                            background: gray100
                        }
                    }}>
                        <CloseIcon />
                    </IconButton>
                    <Divider sx={{ borderRight: `0.0625rem solid ${gray100}`, height: '2.25rem', mx: '1rem' }} />
                    <Typography>
                        Map selected dataset
                    </Typography>
                </Box>

                <Box display='flex' gap={1}>
                    <IconButton sx={{ borderRadius: '0.5rem' }} onClick={handleStartTutorial}>
                        <MapTriFold />
                    </IconButton>
                    <Button onClick={handleInfoBtnClick} disableRipple variant="outlined" className="about-info__btn">
                        Info
                    </Button>
                </Box>
            </Box>

            {isInfoOpen && <Info setIsInfoOpen={setIsInfoOpen} />}
        </>
    )
};

export default Header;