import { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Form, Link, LoaderFunctionArgs, redirect, useActionData, useLocation, useNavigation } from "react-router-dom";
import { fakeAuthProvider } from "../../providers";

const LoginPage: React.FC<unknown> = () => {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let from = params.get("from") || "/";

  let navigation = useNavigation();
  let isLoggingIn = navigation.formData?.get("username") != null;

  let actionData = useActionData() as { error: string } | undefined;

  const handleLogin = () => {};
  return (
    <Box>
      <Grid container direction="column" justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
        <Grid item xs={12} sm={8} md={6} lg={4} justifyContent="center" alignItems="center">
          <Typography variant="h4" gutterBottom align="center">
            Smart City UNAL
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Box>
            <Typography variant="h5" gutterBottom align="center">
              Ingresa tu usuario y contraseña
            </Typography>
            <Form method="post" replace>
              <input type="hidden" name="redirectTo" value={from} />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField name="username" fullWidth placeholder="correo@unal.edu.co" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField name="password" fullWidth placeholder="Contraseña" type="password" variant="outlined" />
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
                  <Button type="submit" color="primary" variant="contained" fullWidth disabled={isLoggingIn}>
                    {isLoggingIn ? "Ingresando..." : "Ingresar"}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export const loginAction = async ({ request }: LoaderFunctionArgs) => {
  let formData = await request.formData();
  let username = formData.get("username") as string | null;
  let userPassword = formData.get("password") as string | null;

  // Validate our form inputs and return validation errors via useActionData()
  if (!username) {
    return {
      error: "Debes ingresar un nombre de usuario valido!",
    };
  }

  // Sign in and redirect to the proper destination if successful.
  try {
    await fakeAuthProvider.signin(username);
  } catch (error) {
    // Unused as of now but this is how you would handle invalid
    // username/password combinations - just like validating the inputs
    // above
    return {
      error: "Intento de inicio de sesión no válido",
    };
  }

  let redirectTo = formData.get("redirectTo") as string | null;
  return redirect(redirectTo || "/");
};

export const loginLoader = async () => {
  if (fakeAuthProvider.isAuthenticated) {
    return redirect("/");
  }
  return null;
};

export default LoginPage;
