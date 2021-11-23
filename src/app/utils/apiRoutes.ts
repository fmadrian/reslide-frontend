const serverRoute = 'http://localhost:8080/api';
const baseRoutes = {
  auth: `${serverRoute}/auth`,
  individual: `${serverRoute}/individual`,
  individualType: `${serverRoute}/individual/type`,
  contactType: `${serverRoute}/contact/type`,
  product: `${serverRoute}/product`,
  measurementType: `${serverRoute}/measurement-type`,
  productType: `${serverRoute}/product/type`,
  productBrand: `${serverRoute}/product/brand`,
  paymentMethod: `${serverRoute}/payment/method`,
  payment: `${serverRoute}/payment`,
  invoiceDetail: `${serverRoute}/invoice/detail`,
  invoice: `${serverRoute}/invoice`,
  order: `${serverRoute}/order`,
  orderDetail: `${serverRoute}/order/detail`,
};

export const ApiRoutes = {
  auth: {
    createUser: `${baseRoutes.auth}/create/user`,
    updateUser: `${baseRoutes.auth}/update/user`,
    getUserInformation: `${baseRoutes.auth}/get/user/`,
    login: `${baseRoutes.auth}/login`,
    refreshToken: `${baseRoutes.auth}/refresh/token`,
    delete: `${baseRoutes.auth}/delete`,
    logout: `${baseRoutes.auth}/logout`,
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
    get: (id: number) => `${baseRoutes.productBrand}/get/${id}`,
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
    switchState: `${baseRoutes.invoiceDetail}/update/status`,
  },
  invoice: {
    search: `${baseRoutes.invoice}/search`,
    searchByClient: `${baseRoutes.invoice}/search/client`,
    get: (id: number) => `${baseRoutes.invoice}/get/${id}`,
    create: `${baseRoutes.invoice}/create`,
    update: `${baseRoutes.invoice}/update`,
    switchStatus: `${baseRoutes.invoice}/update/status`,
  },
  order: {
    search: `${baseRoutes.order}/search`,
    searchByClient: `${baseRoutes.order}/search/client`,
    get: (id: number) => `${baseRoutes.order}/get/${id}`,
    create: `${baseRoutes.order}/create`,
    update: `${baseRoutes.order}/update`,
    deliverAllProducts: `${baseRoutes.order}/deliver`,
    switchStatus: `${baseRoutes.order}/update/status`,
  },
  orderDetail: {
    validate: `${baseRoutes.orderDetail}/validate`,
    create: `${baseRoutes.orderDetail}/create`,
    delete: (orderId: number, detailId: number) =>
      `${baseRoutes.orderDetail}/delete/${orderId}/${detailId}`,
    switchState: `${baseRoutes.orderDetail}/update/status`,
  },

  payment: {
    create: `${baseRoutes.payment}/create`,
    overturn: `${baseRoutes.payment}/overturn`,
  },
};
