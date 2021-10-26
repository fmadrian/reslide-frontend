/**
 * Used to represent menu items.
 */
export interface MenuItem {
  name: string;
  route?: string;
  description?: string;
  subitems?: MenuItem[];
}
