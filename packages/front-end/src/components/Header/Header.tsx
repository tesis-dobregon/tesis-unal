import {
  AppBar,
  Avatar,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" spacing={8}>
            <Typography variant="h2">Smart city Unal</Typography>
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

          <Tooltip title="Open settings">
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="Profile" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
