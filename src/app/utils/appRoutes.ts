const baseRoutes ={
    'user' : 'user'
}
export const AppRoutes = {
    'login' : 'login',
    'landing' : '',
    'user' : {
        'create' : `${baseRoutes.user}/create`
    },
    'error':{
        'notFound' : '**',
        'internal' : 'internal'
    }
}
