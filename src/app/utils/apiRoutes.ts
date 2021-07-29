const serverRoute = 'http://localhost:8080/api';
const baseRoutes = {
    'auth' : `${serverRoute}/auth`
}

export const ApiRoutes = {
    'auth' :{
        'createUser' : `${baseRoutes.auth}/create/user`,
        'login' : `${baseRoutes.auth}/login`,
        'refreshToken' : `${baseRoutes.auth}/refresh/token`
    }
}