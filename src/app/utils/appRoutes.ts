const baseRoutes ={
    'user' : 'user',
    'individual' : 'individual',
    'product' : 'product'
}
export const AppRoutes = {
    'login' : 'login',
    'landing' : '',
    'user' : {
        'create' : `${baseRoutes.user}/create`
    },
    'individual' : {
        'create' : `${baseRoutes.individual}/create`,
        'search' : `${baseRoutes.individual}/search`,
        'update': `${baseRoutes.individual}/update/:id`,
        'update_id': (id:number) => `${baseRoutes.individual}/update/${id}` // Includes the id
    },
    'product' : {
        'create' : `${baseRoutes.product}/create`,
        'search' : `${baseRoutes.product}/search`
    },
    'error':{
        'notFound' : '**',
        'internal' : 'internal'
    }
}
