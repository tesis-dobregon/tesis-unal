import React from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import AngeoScLogo from '../../assets/angeosc.png';
import UnalLogo from '../../assets/universidad-nacional.png';

const sxMap = {
  paper: {
    marginTop: 'calc(10% + 60px)',
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
  imageContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    display: 'flex',
    my: 1,
    gap: 5,
  },
  copyRightContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    display: 'flex',
    mb: 2,
  },
};

export const Footer: React.FC = () => {
  return (
    <Paper sx={sxMap.paper} component="footer" square variant="outlined">
      <Container maxWidth="lg">
        <Box sx={sxMap.imageContainer}>
          <Box
            component="img"
            sx={{
              maxHeight: 60,
            }}
            alt="AngeoSc Logo"
            src={AngeoScLogo}
          />
          <Box
            component="img"
            sx={{
              maxHeight: 60,
            }}
            alt="Universidad Nacional Logo"
            src={UnalLogo}
          />
        </Box>

        <Box sx={sxMap.copyRightContainer}>
          <Typography variant="caption" color="initial">
            Copyright ©2024.
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
};
