import { useForm } from "react-hook-form";
import { Box, Button, TextField, InputLabel, Typography, Divider } from "@mui/material";
import { useNavigate, Link } from "react-router-dom"
import { sistemaDeteccionApi } from "../../../api";

import { localStorageManager } from "../../../utils"; 
import { isEmail } from "../../../utils/validations";

import "./LoginPage.css"


interface loginFormData {
  email: string;
  password: string;
}

const initialLoginFormState: loginFormData = {
  email: "",
  password: ""
}

export const LoginPage = () => {
  const { register, handleSubmit, formState: { errors }  } = useForm<loginFormData>({ defaultValues: initialLoginFormState })
  const navigate = useNavigate();

  const onLoginSubmit = async (loginFormData: loginFormData) => {
    try {
      const {data} = await sistemaDeteccionApi.post("auth/login", loginFormData )
      localStorageManager.saveToken(data.data.access_token)
    } catch (error) {
      
    }
  }

  const onEnterWithoutAccount = () => {
    navigate("/dashboard")
  }


  return (
    <Box display="flex" flexDirection="row" height="100vh" width="100vw" >
      <Box 
        className="background-image" 
        component="aside" 
        width="40%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
          <Box  
            component="img"
            sx={{
              height: 220,
              width: 240,
            }}
            alt="Eagle"
            src="../src/assets/eagle.png"
          />    
      </Box>
      <Box component="aside" className="form-section" padding="5%">
            <Box 
              display="flex" 
              flexDirection="column" 
              alignItems="center"
              >
              <Typography 
                variant="h4" 
                component="h1"
                > Sistema de detección de conducta criminal. </Typography>
              <Typography variant="h5" component="p">Bienvenido!</Typography>
            </Box>

            <form onSubmit={handleSubmit(onLoginSubmit)} style={{display: "flex", flexDirection: "column"}}>
              <InputLabel>
                Correo electrónico*:
              </InputLabel> 
              <TextField 
                variant="outlined" 
                size="small"
                fullWidth
                margin="normal"
                {...register("email",{ 
                  validate: isEmail,
                  required: "Este campo es obligatorio",
                })}
                error={!!errors.email}
                helperText = {errors.email?.message} 
                />

              <InputLabel>
                Contraseña*:
              </InputLabel> 
              <TextField 
                variant="outlined" 
                size="small"
                fullWidth
                margin="normal"
                {...register("password",{
                  required: "Este campo es obligatorio",
                })}
                error={!!errors.password}
                helperText = {errors.password?.message} 
              />

              <Button 
                variant="contained" 
                type="submit"
                sx={{marginBlock:"10px"}}
              >Iniciar sesion</Button>

                <Divider > <Typography> También puedes: </Typography>  </Divider>
              
              <Button 
                variant="outlined"
                sx={{marginBlock:"10px"}}
                onClick={onEnterWithoutAccount}
              >
                Ingresar sin cuenta
              </Button>

              <Typography>
                Todavia no tienes cuenta? 
                <Link 
                  to="/auth/register" 
                  style={{ marginLeft:"4px", color:"#214D90"}}>
                  Crear cuenta
                </Link>
              </Typography>

            </form>
      </Box>
    </Box>
  )
}
