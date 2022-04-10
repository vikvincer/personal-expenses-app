import { Component, OnInit } from '@angular/core';
import { NavBarConfig } from '../../configs/navbar.config';

@Component({
  selector: 'app-menu-side-bar',
  templateUrl: './menu-side-bar.component.html',
  styleUrls: ['./menu-side-bar.component.scss']
})
export class MenuSideBarComponent implements OnInit {

  navConfig = NavBarConfig;
  constructor() { }

  ngOnInit(): void {
  }

}
