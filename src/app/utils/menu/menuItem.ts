import { SubMenuItem } from './subMenuItem';

/**
 * Used to represent menu items.
 */
export interface MenuItem{
    name: string; 
    subItems: SubMenuItem[];
}