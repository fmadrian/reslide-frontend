const serverRoute = 'http://localhost:8080/api';
const baseRoutes = {
  auth: `${serverRoute}/auth`,
  individual: `${serverRoute}/individual`,
  individualType: `${serverRoute}/individual/type`,
  contactType: `${serverRoute}/contact/type`,
  product: `${serverRoute}/product`,
  measurementType: `${serverRoute}/measurement/type`,
  productType: `${serverRoute}/product/type`,
  productBrand: `${serverRoute}/product/brand`,
  paymentMethod: `${serverRoute}/payment/method`,
  payment: `${serverRoute}/payment`,
  invoiceDetail: `${serverRoute}/invoice/detail`,
  invoice: `${serverRoute}/invoice`,
};

export const ApiRoutes = {
  auth: {
    createUser: `${baseRoutes.auth}/create/user`,
    login: `${baseRoutes.auth}/login`,
    refreshToken: `${baseRoutes.auth}/refresh/token`,
    delete: `${baseRoutes.auth}/delete`,
  },
  individual: {
    search: `${baseRoutes.individual}/search`,
    get: `${baseRoutes.individual}/get`,
    create: `${baseRoutes.individual}/create`,
    update: `${baseRoutes.individual}/update`,
  },
  individualType: {
    getAll: `${baseRoutes.individualType}/getAll`,
    create: `${baseRoutes.individualType}/create`,
    update: `${baseRoutes.individualType}/update`,
  },
  contactType: {
    search: `${baseRoutes.contactType}/search`,
    create: `${baseRoutes.contactType}/create`,
  },
  product: {
    search: `${baseRoutes.product}/search`,
    update: `${baseRoutes.product}/update`,
    create: `${baseRoutes.product}/create`,
    get: `${baseRoutes.product}/get`,
  },
  measurementType: {
    search: `${baseRoutes.measurementType}/search`,
    get: `${baseRoutes.measurementType}/get`,
    create: `${baseRoutes.measurementType}/create`,
    update: `${baseRoutes.measurementType}/update`,
  },
  productType: {
    search: `${baseRoutes.productType}/search`,
    get: `${baseRoutes.productType}/get`,
    create: `${baseRoutes.productType}/create`,
    update: `${baseRoutes.productType}/update`,
  },
  productBrand: {
    search: `${baseRoutes.productBrand}/search`,
    get: `${baseRoutes.productBrand}/get`,
    create: `${baseRoutes.productBrand}/create`,
    update: `${baseRoutes.productBrand}/update`,
  },
  paymentMethod: {
    search: `${baseRoutes.paymentMethod}/search`,
    get: `${baseRoutes.paymentMethod}/get`,
    create: `${baseRoutes.paymentMethod}/create`,
    update: `${baseRoutes.paymentMethod}/update`,
  },
  invoiceDetail: {
    validate: `${baseRoutes.invoiceDetail}/validate`,
    create: `${baseRoutes.invoiceDetail}/create`,
    delete: (detailId: number, invoiceId: number) =>
      `${baseRoutes.invoiceDetail}/delete/${invoiceId}/${detailId}`,
  },
  invoice: {
    search: `${baseRoutes.invoice}/search`,
    searchByClient: `${baseRoutes.invoice}/search/client`,
    get: (id: number) => `${baseRoutes.invoice}/get/${id}`,
    create: `${baseRoutes.invoice}/create`,
    update: `${baseRoutes.invoice}/update`,
  },
  payment: {
    create: `${baseRoutes.payment}/create`,
    overturn: `${baseRoutes.payment}/overturn`,
  },
};
