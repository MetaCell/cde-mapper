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

const Header = () => {
  const { handleClose, setInfoOpen, infoOpen, tutorialStepIndex, setTutorialStepIndex, setRunTutorial } = useCdeContext();

  const handleInfoButtonClick = () => {
    setInfoOpen(true);
    setTutorialStepIndex(tutorialStepIndex + 1);
  }

  return (
    <>
      <Box sx={styles.root}>
        <Box display='flex' alignItems='center' flex={1}>
          <IconButton disableRipple onClick={handleClose} sx={{
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
          <IconButton sx={{borderRadius: '0.5rem'}} onClick={() => setRunTutorial(true)}>
            <MapTriFold />
          </IconButton>
          <Button onClick={handleInfoButtonClick} disableRipple variant="outlined" className={infoOpen ? '': 'about__info-btn'}>
            Info
          </Button>
        </Box>
      </Box>

      {infoOpen && <Info />}
    </>
  )
 };

export default Header;