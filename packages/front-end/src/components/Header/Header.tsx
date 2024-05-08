/// <reference types="vite-plugin-svgr/client" />
import { useState } from "react";
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
  SvgIcon,
  Toolbar,
  Tooltip,
} from "@mui/material";
import Logo from "../../assets/logo-header.svg?react";
import { Link, useFetcher } from "react-router-dom";

export const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const fetcher = useFetcher();
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" spacing={8}>
            <SvgIcon
              sx={{
                width: "50px",
                margin: 0,
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <Logo />
            </SvgIcon>
            <List component={Stack} direction="row">
              <ListItem>
                <ListItemButton component={Link} to="/">
                  <ListItemText>Home</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton component={Link} to="/sensores">
                  <ListItemText>Sensores</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton component={Link} to="/alertas">
                  <ListItemText>Alertas</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Stack>

          <Box>
            <Tooltip title="Opciones de usuario">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Profile" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <fetcher.Form method="post" action="/logout">
                  <Button type="submit" variant="text" sx={{ color: "black" }}>
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
