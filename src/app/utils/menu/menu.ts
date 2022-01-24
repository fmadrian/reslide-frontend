import { AppRoutes } from '../appRoutes';
import { MenuItem } from './menuItem';

var createFinalItem = (
  name: string,
  route: string,
  description: string = '',
  subitems: MenuItem[] | undefined = undefined
) => {
  let subitem: MenuItem = {
    name,
    route,
    description,
    subitems,
  };
  return subitem;
};
var createNotFinalItem = (name: string, subitems: MenuItem[]) => {
  let item: MenuItem = {
    name,
    subitems,
  };
  return item;
};
var createBaseItem = (subitems: MenuItem[]) => {
  let item: MenuItem = {
    name: '',
    subitems,
  };
  return item;
};
/**
 * Object used to structure the sidebar menu.
 */
export const SidenavMenu = createBaseItem([
  createFinalItem('Main page', AppRoutes.landing),
  createNotFinalItem('Users', [
    createFinalItem(
      'Create new user',
      AppRoutes.user.create,
      'Creates a new user'
    ),
    createFinalItem('Search a user', AppRoutes.user.search),
  ]),
  createNotFinalItem('Clients / Providers', [
    createFinalItem(
      'Create a new client or provider',
      AppRoutes.individual.create
    ),
    createFinalItem('Search a client or provider', AppRoutes.individual.search),
  ]),
  createNotFinalItem('Products', [
    createFinalItem('Create a new product', AppRoutes.product.create),
    createFinalItem('Search a product', AppRoutes.product.search),
  ]),
  createNotFinalItem('Invoices', [
    createFinalItem('Create a new invoice', AppRoutes.invoice.create),
    createFinalItem('Search an invoice', AppRoutes.invoice.search),
  ]),
  createNotFinalItem('Orders', [
    createFinalItem('Create a new order', AppRoutes.order.create),
    createFinalItem('Search an order', AppRoutes.order.search),
  ]),
  createNotFinalItem('Product brand', [
    createFinalItem(
      'Create a new product brand',
      AppRoutes.productBrand.create
    ),
    createFinalItem('Search a product brand', AppRoutes.productBrand.search),
  ]),
  createNotFinalItem('Measurement type', [
    createFinalItem(
      'Create a new measurement type',
      AppRoutes.measurementType.create
    ),
    createFinalItem(
      'Search a measurement type',
      AppRoutes.measurementType.search
    ),
  ]),
  createNotFinalItem('Payment methods', [
    createFinalItem(
      'Create a new payment method',
      AppRoutes.paymentMethod.create
    ),
    createFinalItem('Search a payment method', AppRoutes.paymentMethod.search),
  ]),
  createNotFinalItem('Individual type', [
    createFinalItem(
      'Create a new individual type',
      AppRoutes.individualType.create
    ),
    createFinalItem(
      'Search an individual type',
      AppRoutes.individualType.search
    ),
  ]),
  createNotFinalItem('Payments', [
    createFinalItem('Search a payment', AppRoutes.payment.search),
  ]),
  createNotFinalItem('Contact type', [
    createFinalItem('Create a new contact type', AppRoutes.contactType.create),
    createFinalItem('Search a contact type', AppRoutes.contactType.search),
  ]),
  createNotFinalItem('Product type', [
    createFinalItem('Create a new product type', AppRoutes.productType.create),
    createFinalItem('Search a product type', AppRoutes.productType.search),
  ]),
]);
