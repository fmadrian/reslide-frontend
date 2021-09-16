const baseRoutes = {
  user: 'user',
  individual: 'individual',
  product: 'product',
  measurementType: 'measurementType',
  invoice: 'invoice',
};
export const AppRoutes = {
  login: 'login',
  landing: '',
  user: {
    create: `${baseRoutes.user}/create`,
  },
  individual: {
    create: `${baseRoutes.individual}/create`,
    search: `${baseRoutes.individual}/search`,
    update: `${baseRoutes.individual}/update/:id`,
    update_id: (id: number) => `${baseRoutes.individual}/update/${id}`, // Includes the id
  },
  measurementType: {
    create: `${baseRoutes.measurementType}/create`,
    search: `${baseRoutes.measurementType}/search`,
    update: `${baseRoutes.measurementType}/update/:id`,
    update_id: (id: number) => `${baseRoutes.measurementType}/update/${id}`, // Includes the id
  },
  product: {
    create: `${baseRoutes.product}/create`,
    search: `${baseRoutes.product}/search`,
    update: `${baseRoutes.product}/update/:id`,
    update_id: (id: number) => `${baseRoutes.product}/update/${id}`, // Includes the id
  },
  invoice: {
    create: `${baseRoutes.invoice}/create`,
    search: `${baseRoutes.invoice}/search`,
    view: `${baseRoutes.invoice}/:id`,
    view_id: (id: number) => `${baseRoutes.invoice}/${id}`,
    update: `${baseRoutes.invoice}/update/:id`,
    update_id: (id: number) => `${baseRoutes.invoice}/update/${id}`, // Includes the id
  },
  error: {
    notFound: '**',
    internal: 'internal',
  },
};
