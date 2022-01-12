const baseRoutes = {
  user: 'user',
  individual: 'individual',
  individualType: 'individual-type',
  product: 'product',
  measurementType: 'measurement-type',
  invoice: 'invoice',
  order: 'order',
  productBrand: 'product/brand',
  paymentMethod: 'payment-method',
  payment: 'payment',
};
export const AppRoutes = {
  login: 'login',
  landing: '',
  user: {
    create: `${baseRoutes.user}/create`,
    update: `${baseRoutes.user}/update`,
  },
  individual: {
    create: `${baseRoutes.individual}/create`,
    search: `${baseRoutes.individual}/search`,
    update: `${baseRoutes.individual}/update/:id`, // Used for routing in the app.routing.module.ts
    update_id: (id: number) => `${baseRoutes.individual}/update/${id}`, // Used to include the id in URL
  },
  individualType: {
    create: `${baseRoutes.individualType}/create`,
    search: `${baseRoutes.individualType}/search`,
    update: `${baseRoutes.individualType}/update/:id`, // Used for routing in the app.routing.module.ts
    update_id: (id: number) => `${baseRoutes.individualType}/update/${id}`, // Used to include the id in URL
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
  order: {
    create: `${baseRoutes.order}/create`,
    search: `${baseRoutes.order}/search`,
    view: `${baseRoutes.order}/:id`,
    view_id: (id: number) => `${baseRoutes.order}/${id}`,
    update: `${baseRoutes.order}/update/:id`,
    update_id: (id: number) => `${baseRoutes.order}/update/${id}`, // Includes the id
  },
  productBrand: {
    create: `${baseRoutes.productBrand}/create`,
    update: `${baseRoutes.productBrand}/update/:id`,
    update_id: (id: number) => `${baseRoutes.productBrand}/update/${id}`,
    search: `${baseRoutes.productBrand}/search`,
  },
  paymentMethod: {
    create: `${baseRoutes.paymentMethod}/create`,
    update: `${baseRoutes.paymentMethod}/update/:id`,
    update_id: (id: number) => `${baseRoutes.paymentMethod}/update/${id}`,
    search: `${baseRoutes.paymentMethod}/search`,
  },
  payment: {
    search: `${baseRoutes.payment}/search`,
  },
  error: {
    notFound: '**',
    internal: 'internal',
  },
};
