import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../components.styles.scss', './home.component.scss']
})

export class HomeComponent implements OnInit {

  isSticky = true;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {}

  message(txt: string) {
    console.log(txt);
  }

  goTo(route: string) {
    switch(route) {
      case 'we-are':
        this.router.navigate(['we-are']);
        break;
      case 'login':
        this.router.navigate(['login']);
        break;
      case 'why-us':
        this.router.navigate(['why-us']);
        break;
      case 'about-us':
        this.router.navigate(['about-us']);
        break;
      default:
        break;
    }
  }

}
