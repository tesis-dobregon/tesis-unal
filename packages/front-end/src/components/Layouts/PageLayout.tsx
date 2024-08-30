import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Container } from '@mui/material';

const sxMap = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '100%',
    width: '100%',
    py: '3rem',
    px: '3rem',
  },
};

export const PageLayout = () => {
  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={sxMap.container}>
        <Outlet />
      </Container>
    </>
  );
};
