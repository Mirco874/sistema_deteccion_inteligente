import { createContext } from 'react';

interface ContextProps{
     cameras: string[];
     loadConnectedCameras: () => void;
     connectCamera: (cameraId: string) => void;
     disconnectCamera: (cameraId: string) => void;
}

export const CamerasContext =createContext({} as ContextProps );