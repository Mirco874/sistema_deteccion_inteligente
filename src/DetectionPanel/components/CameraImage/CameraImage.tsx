import { Grid } from "@mui/material";
import { useContext } from "react";
import Webcam from "react-webcam";
import { CamerasConnectedStatus } from "..";
import { CamerasContext } from "../../../context";

export const CameraImage = () => {
    const { systemConnectedCameras } = useContext(CamerasContext);

  return (
    <Grid container spacing={3}> 
        <Grid item>
            <Webcam audio={false} videoConstraints={{ deviceId: systemConnectedCameras[0].id }} />
        </Grid>
        <Grid item>
            <CamerasConnectedStatus/>
        </Grid>

        
    </Grid>
  )
}


