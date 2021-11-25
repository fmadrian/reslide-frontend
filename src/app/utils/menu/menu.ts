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
  createNotFinalItem('Users', [
    createFinalItem(
      'Create new user',
      AppRoutes.user.create,
      'Creates a new user'
    ),
  ]),
  createNotFinalItem('Clients / Providers', [
    createFinalItem(
      'Create new client or provider',
      AppRoutes.individual.create
    ),
    createFinalItem(
      'Search for a client or provider',
      AppRoutes.individual.search
    ),
  ]),
  createNotFinalItem('Products', [
    createFinalItem('Create new product', AppRoutes.product.create),
    createFinalItem('Search for a product', AppRoutes.product.search),
  ]),
  createNotFinalItem('Invoices', [
    createFinalItem('Create new invoice', AppRoutes.invoice.create),
    createFinalItem('Search for a invoice', AppRoutes.invoice.search),
  ]),
  createNotFinalItem('Orders', [
    createFinalItem('Create new order', AppRoutes.order.create),
    createFinalItem('Search for a order', AppRoutes.order.search),
  ]),
  createNotFinalItem('Product brand', [
    createFinalItem('Create new product brand', AppRoutes.productBrand.create),
    createFinalItem(
      'Search for a product brand',
      AppRoutes.productBrand.search
    ),
  ]),
  createNotFinalItem('Measurement type', [
    createFinalItem(
      'Create new measurement type',
      AppRoutes.measurementType.create
    ),
    createFinalItem(
      'Search for a measurement type',
      AppRoutes.measurementType.search
    ),
  ]),
  createNotFinalItem('Payment methods', [
    createFinalItem(
      'Create new payment method',
      AppRoutes.paymentMethod.create
    ),
    createFinalItem('Search a payment method', AppRoutes.paymentMethod.search),
  ]),
]);
