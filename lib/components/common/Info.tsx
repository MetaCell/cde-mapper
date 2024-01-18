import { Box, Button, Divider, IconButton, Link, Typography } from "@mui/material";
import { CloseIcon } from "../../icons";
import { vars } from "../../theme/variables";
import { useCdeContext } from "../../CdeContext";

const { baseWhite, gray700, gray600, primary600, gray400 } = vars;

const styles = {
  backdrop: {
    position: 'absolute',
    background: 'rgba(0, 0, 0, 0.10)',
    width: '100%',
    height: '100%',
    transition: 'all ease-in-out .3s',
    zIndex: 91,
  },

  wrap: {
    width: '22.5rem',
    zIndex: 92,
    position: 'absolute',
    height: '100%',
    top: 0,
    right: 0,
    marginLeft: 'auto',
    transition: 'all ease-in-out .3s',
    background: baseWhite,
    boxShadow: '0rem 0.5rem 0.5rem -0.25rem rgba(16, 24, 40, 0.03), 0rem 1.25rem 1.5rem -0.25rem rgba(16, 24, 40, 0.08)',
  },

  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    p: '0.75rem 1.5rem 1rem',
    '& .MuiTypography-h3': {
      color: gray700,
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: '155.556%',
    },
    '& .MuiTypography-body2': {
      color: gray600,
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '142.857%',
    }
  },

  body: {
    display: 'flex',
    alignItems: 'start',
    flexDirection: 'column',
    gap: '1rem',
    height: 'calc(100% - 10.25rem)',
    overflow: 'auto',
    p: '1rem 1.5rem',

    '& .MuiButton-root': {
      padding: 0,
      color: primary600,
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: '142.857%',
      boxShadow: 'none',
      '&:hover': {
        background: 'none'
      }
    },

    '& .MuiDivider-root': {
      margin: '1rem 0',
      width: '100%'
    },

    '& ol': {
      margin: '0.5rem 0 0',
      padding: '0 0 0 1rem',
      '& li': {
        color: gray600,
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: '142.857%',
      }
    },

    '& .MuiTypography-h4': {
      color: gray400,
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: '142.857%',
      marginBottom: '0.5rem'
    },
    '& .MuiTypography-body1': {
      color: gray600,
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '142.857%',

      '& a': {
        color: gray600,
        textDecoration: 'none'
      },

      '& + .MuiTypography-body1': {
        marginTop: '1rem'
      }
    }
  }
};

const Info = () => {
  const { setInfoOpen } = useCdeContext();
  const handleClose = () => {
    setInfoOpen(false)
  }

  const InfoContent = () => (
    <>
      <Box sx={styles.header}>
        <IconButton onClick={handleClose} sx={{ p: 1, borderRadius: 2, ml: 'auto' }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h3">About CDE mapping</Typography>
        <Typography variant="body2">
          Developed by data scientists and professors at University of California San Diego (UCSD).
        </Typography>
      </Box>

      <Box sx={styles.body}>
        <Box>
          <Typography variant="h4">About CDE</Typography>
          <Typography>
            Common Data Element (CDE) are data elements that have been recommended or required by NIH Institutes and Centers and other organizations for use in research and for other purposes.
          </Typography>

          <Typography>
            A data element is a basic unit of information (i.e., a variable) collected within a dataset that has a unique meaning and subcategories (data items) of distinct value.
          </Typography>

          <Typography>
            Examples of data elements include gender, race, and geographic location. ODC is implementing NIH’s CDEs where appropriate to aid in standardization and harmonization across different datasets.
          </Typography>
        </Box>

        <Box>
          <Typography variant="h4">How does CDE mapping work</Typography>
          <Typography>
            Select a CDE that best fit your dataset fields and once that’s been done and you’ve clicked ‘save’, you can then export it to be used across your lab and have data elements that are standardized.
          </Typography>
        </Box>

        <Box>
          <Typography variant="h4">When to map CDE</Typography>
          <Typography>
            There are two different ways you can map CDE,
            <ol>
              <li>Before acquiring datasets</li>
              <li>After all your datasets are available</li>
            </ol>
          </Typography>
        </Box>

        <Box>
          <Typography variant="h4">How to map CDE</Typography>
          <Typography>
            Depending on when you’re mapping CDE, start by creating a comprehensive template for your project, and then choose the most relevant CDEs from the options available.
          </Typography>
          <Typography>
            If you're mapping CDEs after acquiring datasets, simply access the dropdown menu to find an extensive list of CDEs, select the ones that align best with your data, and explore suggested CDEs tailored to your dataset.
          </Typography>

        </Box>

        <Button disableRipple>View the documentation on CDEs</Button>

        <Divider />

        <Box>
          <Typography>
            For more information please contact <Link target="_blank" href="cde@ucsd.com">cde@ucsd.com</Link>
          </Typography>
        </Box>
      </Box>
    </>
  )

  return (
    <>
      <Box sx={styles.backdrop} onClick={handleClose} />
      <Box sx={styles.wrap}>
        {InfoContent()}
      </Box>
    </>
  )
};

export default Info;