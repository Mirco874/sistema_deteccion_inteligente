import { Grid } from "@mui/material";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { CamerasConnectedStatus } from "..";
import { CamerasContext } from "../../../context";

export const CameraImage = () => {
  const webcamRef = useRef(null);
  const [websckt, setWebsckt] = useState<WebSocket>();
  const { systemConnectedCameras } = useContext(CamerasContext);
  const [procesedImage, setProcesedImage] = useState<string>("");

  const getBase64WebcamImage = () => {
    if (systemConnectedCameras.length > 0) {
      return webcamRef.current!.getScreenshot();
    }
    return "";
  };

  useEffect(() => {
    const url = "ws://35.219.131.85:5000/detect-suspicious-objects/1";
    const ws = new WebSocket(url);

    ws.onopen = (event) => {
      ws.send("Connect");
    };

    ws.onmessage = (e) => {
      console.log(JSON.parse(e.data));
    };

    setWebsckt(ws);

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (websckt) {
      websckt.send(getBase64WebcamImage());

      websckt.onmessage = (e) => {
        //ToDo crear interfaz
        const { message } = JSON.parse(e.data);
        console.log(message);
        setProcesedImage(message);
      };
    }
  };

    useEffect(()=>{
    const intervalId = setInterval(()=>sendMessage(),500);
    return ()=>(clearInterval(intervalId));
  },[websckt])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} >
          <img
            src={`data:image/jpeg;base64,${procesedImage}`}
            alt="processed image"
            style={{width:"40vw", height:"50vh" }}
          />
          <Webcam
            ref={webcamRef}
            audio={false}
            videoConstraints={{
              deviceId: systemConnectedCameras[0].id,
              height: 320,
            }}
          />

      </Grid>

      <Grid item xs={5}>
        <CamerasConnectedStatus />
      </Grid>
    </Grid>
  );
};
