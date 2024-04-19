import { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import './login.scss';
import { Link } from "react-router-dom";
interface userCredentials{
    username: string;
    password: string;
}
const LoginPage: React.FunctionComponent<unknown> = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {

    }
    return(
        <>
            <Grid container direction="column" justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <Grid item  xs={12} sm={8} md={6} lg={4} justifyContent="center" alignItems="center">
                <Typography variant="h4" gutterBottom align="center">Smart City UNAL</Typography> 
                </Grid>
                <Grid item xs={12} sm={8} md={6} lg={4}>                  
                    <div>
                        <Typography variant="h5" gutterBottom align="center">
                            Ingresa tu usuario y contraeña
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
                                <div className="link-right">
                                    <Link to={""}>
                                        ¿Olvidó la contraseña?
                                    </Link>
                                </div>
                                <Grid item xs={12}>
                                    <Button type="submit" className="black-button" fullWidth>
                                        Ingresar
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}
export default LoginPage;