import { Component, Input, OnInit } from '@angular/core';
import { SidenavMenu } from 'src/app/utils/menu/menu';
import { MenuItem } from 'src/app/utils/menu/menuItem';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  sidenavMenu : MenuItem[];
  constructor() {
    this.sidenavMenu = SidenavMenu;
  }

  ngOnInit(): void {
    this.sidenavMenu = SidenavMenu;
  }

}
