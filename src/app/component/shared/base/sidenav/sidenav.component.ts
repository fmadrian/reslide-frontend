import { Component, OnInit } from '@angular/core';
import { SidenavMenu } from 'src/app/utils/menu/menu';
import { MenuItem } from 'src/app/utils/menu/menuItem';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  CURRENT_MENU: MenuItem;
  // Stack where the previous menus visited will be stored.
  PREVIOUS_MENU: MenuItem[];
  constructor() {
    this.CURRENT_MENU = SidenavMenu;
    this.PREVIOUS_MENU = [];
  }

  ngOnInit(): void {}

  openItem(item: MenuItem) {
    if (item.subitems) {
      // Add the current menu to the stack and change it.
      this.PREVIOUS_MENU.push(this.CURRENT_MENU);
      this.CURRENT_MENU = item;
    }
  }

  return() {
    // Use the last element added to the stack.
    if (this.PREVIOUS_MENU.length > 0) {
      const newItem = this.PREVIOUS_MENU.pop();
      if (newItem) {
        this.CURRENT_MENU = newItem;
      }
    }
  }
  getCurrentMenuName() {
    return this.CURRENT_MENU.name;
  }
}
