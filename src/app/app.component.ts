import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavBarConfig } from './configs/navbar.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: any = '';
  navBarConfig = NavBarConfig;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe(event => {
      this.title = this.navBarConfig.find(c => c.path === event.url);
    })
  }
}
