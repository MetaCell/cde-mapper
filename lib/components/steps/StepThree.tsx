import { Box, Button, Chip, InputAdornment, TextField, Typography } from "@mui/material"
import ModalHeightWrapper from "../common/ModalHeightWrapper"
import { ArrowDropDown, ArrowIcon, BulletIcon, FilterIcon, GlobeIcon, SearchIcon, SortIcon } from "../../icons";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from "react";

const StepThree = () => {
  const [togglePreview, setTogglePreview] = useState(false);
  return (
    <>
      <ModalHeightWrapper>
        <Box alignItems='center' display='flex' gap={1.5} mb={3}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search column headers or mapped CDEs..."
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>
            }}
          />
          <Button variant="outlined">
            <FilterIcon />
            Filter
          </Button>
        </Box>

        <Box px={1.5}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={180}>
                  <SortIcon style={{ marginLeft: 0 }} />
                </TableCell>
                <TableCell width={300}>
                  Column headers from dataset
                  <SortIcon />
                </TableCell>
                <TableCell width={16} />
                <TableCell width='calc(100% - (11.25rem + 18.75rem + 1rem))'>
                  CDEs/ Data Dictionary fields
                  <SortIcon />
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>
                  <Chip
                    label="Unmapped"
                    size="small"
                    icon={<BulletIcon color="#676C74" />}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    disabled
                    fullWidth
                    value='MotorForceApplied'
                  />
                </TableCell>
                <TableCell>
                  <ArrowIcon />
                </TableCell>
                <TableCell>
                  <TextField fullWidth placeholder="Choose CDE or Data Dictionary fields..." />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <Chip
                    color="success"
                    size="small"
                    label="Mapped to CDE"
                    icon={<BulletIcon />}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    disabled
                    fullWidth
                    value='Subject'
                  />
                </TableCell>
                <TableCell>
                  <ArrowIcon />
                </TableCell>
                <TableCell>
                  <TextField fullWidth placeholder="Choose CDE or Data Dictionary fields..." />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </ModalHeightWrapper>

      <Box sx={{
        position: 'absolute',
        background: '#fff',
        zIndex: 9,
        bottom: 0,
        left: 0,
        width: '100%',
        borderRadius: '0.75rem 0.75rem 0 0',
        border: '0.0625rem solid #ECEDEE',
      }}>
        <Box display='flex' gap={1.5} px={3} py={2} sx={{ cursor: 'pointer' }} alignItems='center' onClick={() => setTogglePreview(!togglePreview)}>
          <Typography sx={{
              flex: 1,
              color: '#676C74',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              fontWeight: 600,
              lineHeight: '142.857%'
            }}>
              <ArrowDropDown style={{transform: togglePreview ? 'rotate(90deg)' : 'rotate(0deg)'}} color="#676C74" />
              Preview
            </Typography>

          <Box display='flex' alignItems='center' gap={1}>
            <Typography sx={{
              color: '#4F5359',
              fontSize: '0.875rem',
              lineHeight: '142.857%'
            }}>
              124 total number of column headers
            </Typography>

            <Chip icon={<BulletIcon />} color="success" label="87 mapped" size="small" />
            <Chip icon={<BulletIcon color="#676C74" />} label="37 unmapped" size="small" />
          </Box>
        </Box>

        {togglePreview && (
          <Box py={1.5} px={3} sx={{
            borderTop: '0.0625rem solid #ECEDEE',
            overflow: 'auto',
            maxHeight: '21.25rem',

            '&:after': {
              content: '""',
              height: '7.8125rem',
              minWidth: '100%',
              position: 'absolute',
              bottom: 0,
              left: 0,
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 83.85%)',
            }
          }}>
            <Box display='flex' mb={1} alignItems='center' sx={{
              '& > div': {
                flexShrink: 0,
                padding: '0 0.5rem',
                width: '10rem',
                boxSizing: 'border-box'
              }
            }}>
              <Box>
                <Chip color="success" icon={<GlobeIcon color="#027A48" />} label="GUID" size="medium"/>
              </Box>
              <Box>
                <Chip color="success" icon={<GlobeIcon color="#027A48" />} label="SmallSpeciesStrainTyp" size="medium"/>
              </Box>
              <Box>
                <Chip color="success" icon={<GlobeIcon color="#027A48" />} label="SmallSpeciesStrainTyp" size="medium"/>
              </Box>
              <Box>
                <Typography sx={{
                  color: '#A9ACB2',
                  border: '0.0938rem dashed #E4E5E7',
                  borderRadius: '0.25rem',
                  lineHeight: '142.857%',
                  padding: '0.375rem 0.5rem'
                }}>No mapping yet</Typography>
              </Box>
              <Box>
                <Typography sx={{
                  color: '#A9ACB2',
                  border: '0.0938rem dashed #E4E5E7',
                  borderRadius: '0.25rem',
                  lineHeight: '142.857%',
                  padding: '0.375rem 0.5rem'
                }}>No mapping yet</Typography>
              </Box>
              <Box>
                <Typography sx={{
                  color: '#A9ACB2',
                  border: '0.0938rem dashed #E4E5E7',
                  borderRadius: '0.25rem',
                  lineHeight: '142.857%',
                  padding: '0.375rem 0.5rem'
                }}>No mapping yet</Typography>
              </Box>
              <Box>
                <Typography sx={{
                  color: '#A9ACB2',
                  border: '0.0938rem dashed #E4E5E7',
                  borderRadius: '0.25rem',
                  lineHeight: '142.857%',
                  padding: '0.375rem 0.5rem'
                }}>No mapping yet</Typography>
              </Box>
              <Box>
                <Typography sx={{
                  color: '#A9ACB2',
                  border: '0.0938rem dashed #E4E5E7',
                  borderRadius: '0.25rem',
                  lineHeight: '142.857%',
                  padding: '0.375rem 0.5rem'
                }}>No mapping yet</Typography>
              </Box>
              <Box>
                <Typography sx={{
                  color: '#A9ACB2',
                  border: '0.0938rem dashed #E4E5E7',
                  borderRadius: '0.25rem',
                  lineHeight: '142.857%',
                  padding: '0.375rem 0.5rem'
                }}>No mapping yet</Typography>
              </Box>
              <Box>
                <Typography sx={{
                  color: '#A9ACB2',
                  border: '0.0938rem dashed #E4E5E7',
                  borderRadius: '0.25rem',
                  lineHeight: '142.857%',
                  padding: '0.375rem 0.5rem'
                }}>No mapping yet</Typography>
              </Box>
            </Box>

            <Table sx={{
              '& .MuiTableCell-root': {
                boxSizing: 'border-box',
                minWidth: '10rem',
                width: '10rem',
                padding: '0.75rem 1.5rem',
                borderTop: '0.0625rem solid',
                borderColor: '#E4E5E7',
                borderLeft: '0.0625rem solid #E4E5E7',

                '&:last-of-type': {
                  borderRight: '0.0625rem solid #E4E5E7'
                }
              },


              '& .MuiTableCell-body': {
                fontSize: '0.875rem',
                color: '#4F5359',
                lineHeight: '142.857%'
              },
            }}>
              <TableHead>
                <TableRow sx={{
                  '& .MuiTableCell-root': {
                    background: '#F4F5F5',
                  },
                }}>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                  <TableCell>Sex</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>StudyInjModelTyp</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                  <TableCell>Sex</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>StudyInjModelTyp</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                  <TableCell>Sex</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>StudyInjModelTyp</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                  <TableCell>Sex</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>StudyInjModelTyp</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                  <TableCell>Sex</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>StudyInjModelTyp</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                  <TableCell>Sex</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>StudyInjModelTyp</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                  <TableCell>Sex</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>StudyInjModelTyp</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                  <TableCell>Sex</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>StudyInjModelTyp</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                  <TableCell>Sex</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>StudyInjModelTyp</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                  <TableCell>Sex</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>StudyInjModelTyp</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        )}
      </Box>
    </>
  )
}

export default StepThree;