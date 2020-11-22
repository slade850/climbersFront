//set local storage with boolean value for check if user previously logged
export const setStorageLogged = (logged) => {
    return window.localStorage.setItem('logged', logged)
}
//get the value logged in local storage
export const getStorageLogged = () => {
    return window.localStorage.getItem('logged')
}
//clear storage
export const clearLogged = () => {
    window.localStorage.removeItem('logged');
}