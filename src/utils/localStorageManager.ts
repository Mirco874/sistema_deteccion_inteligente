export const saveToken = (token: string) => {
    localStorage.setItem("token", token);
}

export const getToken = (): string | null => {
    return localStorage.getItem("token");
}

export const getCamerasConected = (): string[] => {
    const camerasList: string | null = localStorage.getItem("camerasConected");

    if(!camerasList){
        return [];
    }

    return JSON.parse(camerasList);
}

export const conectCamera = (cameraId: string) =>{
    const camerasConected: string[] = getCamerasConected();

    if(!camerasConected.includes(cameraId)){
        camerasConected.push(cameraId);
        localStorage.setItem("camerasConected", JSON.stringify(camerasConected));
    }
}

export const disconnectCamera = (cameraId: string) =>{
    const camerasConected: string[] = getCamerasConected();

    if(camerasConected.includes(cameraId)){
        const newCamerasConnectedState = camerasConected.filter((camera)=>camera != cameraId);
        localStorage.setItem("camerasConected", JSON.stringify(newCamerasConnectedState));
    }
}