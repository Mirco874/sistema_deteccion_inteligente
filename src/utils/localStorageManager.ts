export const saveToken = (token: string) => {
    localStorage.setItem("token", token);
}

export const getToken = (): string | null => {
    return localStorage.getItem("token");
}