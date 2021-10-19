import { AppRoutes } from '../appRoutes';
import { MenuItem } from './menuItem';

var createSubItem = (name: string, route: string, description: string = '') => {
  let subitem: MenuItem = {
    name,
    route,
    description,
  };
  return subitem;
};
var createMainItem = (name: string, subitems: MenuItem[]) => {
  let item: MenuItem = {
    name,
    subitems,
  };
  return item;
};
/**
 * Object used to structure the sidebar menu.
 */
export const SidenavMenu = [
  createMainItem('Users', [
    createSubItem(
      'Create new user',
      AppRoutes.user.create,
      'Creates a new user'
    ),
  ]),
  createMainItem('Clients / Providers', [
    createSubItem('Create new client or provider', AppRoutes.individual.create),
    createSubItem(
      'Search for a client or provider',
      AppRoutes.individual.search
    ),
  ]),
  createMainItem('Products', [
    createSubItem('Create new product', AppRoutes.product.create),
    createSubItem('Search for a product', AppRoutes.product.search),
  ]),
  createMainItem('Invoices', [
    createSubItem('Create new invoice', AppRoutes.invoice.create),
    createSubItem('Search for a invoice', AppRoutes.invoice.search),
  ]),
  createMainItem('Orders', [
    createSubItem('Create new order', AppRoutes.order.create),
    createSubItem('Search for a order', AppRoutes.order.search),
  ]),
];
