import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import {
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useLocation,
  useNavigation,
  useActionData,
} from 'react-router-dom';
import { authProvider } from '../../providers';

const LoginPage: React.FC<unknown> = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get('from') || '/';

  const navigation = useNavigation();
  const isLoggingIn = navigation.formData?.get('username') != null;

  const actionData = useActionData() as { error: string } | undefined;

  return (
    <Box>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ height: '100vh' }}
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
            <Form method="post" replace>
              <input type="hidden" name="redirectTo" value={from} />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="username"
                    fullWidth
                    placeholder="Nombre de usuario"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    fullWidth
                    placeholder="Contraseña"
                    type="password"
                    variant="outlined"
                  />
                </Grid>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'end',
                    justifyContent: 'end',
                    width: '100%',
                  }}
                >
                  <Link to={''}>¿Olvidó la contraseña?</Link>
                </Box>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? 'Ingresando...' : 'Ingresar'}
                  </Button>
                </Grid>
                {actionData?.error && (
                  <Grid item xs={12}>
                    <Typography color="error" align="center">
                      {actionData.error}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export const loginAction = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const username = formData.get('username') as string;
  const userPassword = formData.get('password') as string;

  // Validate our form inputs and return validation errors via useActionData()
  if (!username) {
    return {
      error: 'Debes ingresar un nombre de usuario valido!',
    };
  }

  // Sign in and redirect to the proper destination if successful.
  try {
    await authProvider.signin(username, userPassword);
  } catch (error) {
    // Unused as of now but this is how you would handle invalid
    // username/password combinations - just like validating the inputs
    // above
    return {
      error: 'Intento de inicio de sesión no válido',
    };
  }

  const redirectTo = formData.get('redirectTo') as string | null;
  return redirect(redirectTo || '/');
};

export const loginLoader = async () => {
  if (authProvider.isAuthenticated) {
    return redirect('/');
  }
  return null;
};

export default LoginPage;
