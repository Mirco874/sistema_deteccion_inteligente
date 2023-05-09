import { FC, useEffect, useReducer } from 'react';
import { CamerasContext, CamerasReducer } from '..';
import { localStorageManager } from '../../utils';

export interface CamerasState {
    cameras: string[];
}

const CAMERAS_INITIAL_STATE: CamerasState={
    cameras: []
}

interface Props{
     children: React.ReactNode
}

export const CamerasProvider:FC<Props> = ({ children }) => {
     const [state, dispatch] = useReducer( CamerasReducer, CAMERAS_INITIAL_STATE );

     const loadConnectedCameras = () =>{
          const localStorageCamerasInfo: string[] = localStorageManager.getCamerasConected();
          dispatch({ type: '[Cameras] - load connected cameras', payload: localStorageCamerasInfo });
     }

     const connectCamera = (cameraId: string) =>{
          localStorageManager.conectCamera(cameraId);
          dispatch({ type: '[Cameras] - connect camera', payload: cameraId });
     }

     const disconnectCamera = (cameraId: string) =>{
          localStorageManager.disconnectCamera(cameraId);
          dispatch({ type: '[Cameras] - disconnect camera', payload: cameraId });
     }

     useEffect(()=>{
          loadConnectedCameras();
     },[])

     return (
          <CamerasContext.Provider value={{
               ...state,
               loadConnectedCameras,
               connectCamera,
               disconnectCamera, 
               }} >
               {children}
          </CamerasContext.Provider>
     )
}
