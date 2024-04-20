import { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const LoginPage: React.FC<unknown> = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {};
  return (
    <Box>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          lg={4}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h4" gutterBottom align="center">
            Smart City UNAL
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Box>
            <Typography variant="h5" gutterBottom align="center">
              Ingresa tu usuario y contraseña
            </Typography>
            <form onSubmit={handleLogin}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    placeholder="correo@unal.edu.co"
                    variant="outlined"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    placeholder="Contraseña"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "end",
                    justifyContent: "end",
                    width: "100%",
                  }}
                >
                  <Link to={""}>¿Olvidó la contraseña?</Link>
                </Box>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                  >
                    Ingresar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default LoginPage;
