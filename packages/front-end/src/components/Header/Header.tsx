/// <reference types="vite-plugin-svgr/client" />
import { useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
} from '@mui/material';
import { Link, useFetcher, useLocation } from 'react-router-dom';
import LogoNoBackground from '../../assets/logo-no-background.svg';

const sxMap = {
  imageContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    display: 'flex',
    my: 1,
    alignItems: 'center',
  },
  listItem: {
    height: 80,
  },
};

export const Header = () => {
  const location = useLocation();
  console.log('location', location.pathname);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const fetcher = useFetcher();
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const routes = [
    { name: 'Home', path: '/' },
    { name: 'Calidad del Aire', path: '/calidad-aire' },
    { name: 'Sensores', path: '/sensores' },
    { name: 'Alertas', path: '/alertas' },
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            p: 0,
          }}
        >
          <Stack direction="row" spacing={8}>
            <Box sx={sxMap.imageContainer}>
              <Box
                component="img"
                sx={{
                  maxHeight: 80,
                }}
                alt="Universidad Nacional Logo"
                src={LogoNoBackground}
              />
            </Box>

            <List component={Stack} direction="row">
              {routes.map((route) => (
                <ListItem key={route.name}>
                  <ListItemButton
                    component={Link}
                    to={route.path}
                    sx={sxMap.listItem}
                  >
                    <ListItemText
                      sx={{
                        borderBottom:
                          location.pathname === route.path
                            ? '2px solid black'
                            : 'none',
                      }}
                    >
                      {route.name}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Stack>

          <Box>
            <Tooltip title="Opciones de usuario">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Profile" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <fetcher.Form method="post" action="/logout">
                  <Button type="submit" variant="text" sx={{ color: 'black' }}>
                    Cerrar sesión
                  </Button>
                </fetcher.Form>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
