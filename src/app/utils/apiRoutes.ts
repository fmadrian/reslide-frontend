const serverRoute = 'http://localhost:8080/api';
const baseRoutes = {
    auth : `${serverRoute}/auth`,
    individual : `${serverRoute}/individual`,
    individualType : `${serverRoute}/individual/type`,
    contactType : `${serverRoute}/contact/type`,
}

export const ApiRoutes = {
    auth :{
        createUser : `${baseRoutes.auth}/create/user`,
        login : `${baseRoutes.auth}/login`,
        refreshToken : `${baseRoutes.auth}/refresh/token`
    },
    individualType : {
        getAll: `${baseRoutes.individualType}/getAll`,
        create: `${baseRoutes.individualType}/create`,
        update: `${baseRoutes.individualType}/update`,
    },
    contactType : {
        search: `${baseRoutes.contactType}/search`,
        create: `${baseRoutes.contactType}/create`,
    },
}