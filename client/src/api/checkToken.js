export const isTokenExpired = () => {
    const expiresIn = localStorage.getItem('expiresIn');
    if(Date.now() > expiresIn) return true;
    return false;
}