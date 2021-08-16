import { AppRoutes } from "../appRoutes"
import { MenuItem } from "./menuItem";
import { SubMenuItem } from "./subMenuItem";

var createSubItem = (name:string, route:string, description :string = '') =>{
    let subItem : SubMenuItem = {
        name, route, description
    }
    return subItem;
}
var createMainItem = (name: string, subItems: SubMenuItem[])=>{
    let item : MenuItem = {
        name, subItems
    }
    return item;
}
/**
 * Object used to structure the sidebar menu. 
 */
export const SidenavMenu =[
    createMainItem('Users', 
        [
            createSubItem('Create new user', AppRoutes.user.create, 'Creates a new user')
        ]
    ),
    createMainItem('Clients / Providers',
        [
            createSubItem('Create new client or provider', AppRoutes.individual.create),
            createSubItem('Search for a client or provider', AppRoutes.individual.search),
        ]
    ),
    createMainItem('Products',
        [
            createSubItem('Create new product', AppRoutes.product.create),
            createSubItem('Search for a product', AppRoutes.product.search),
        ]
    )
    
];