import { sistemaDeteccionApi } from "../api";

const getHeaders = (): any =>{
    const token = localStorage.getItem("token") || "";
    return {
        headers:{ 
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token},
    }
}

export const existUserLogged = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        await sistemaDeteccionApi.get("api/v1/user/validate", getHeaders());
        return true;
      } catch (error) {
        localStorage.removeItem("token")
        return false;
      }
    }
  
    return false;
  };
  