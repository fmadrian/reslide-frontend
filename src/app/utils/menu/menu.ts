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
            createSubItem('Create new user', AppRoutes.user.create, 'Creates a new user'), // TODO: Change to the actual page.
            createSubItem('Edit users', AppRoutes.login) // TODO: Change to the actual page.
        ]
    ),
    createMainItem('Products',
        [
            createSubItem('Create new product', AppRoutes.landing),
            createSubItem('Product placeholder', AppRoutes.landing),
        ]
    )
    
];