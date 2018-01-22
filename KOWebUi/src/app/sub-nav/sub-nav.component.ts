import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sub-nav',
  templateUrl: './sub-nav.component.html',
  styleUrls: ['./sub-nav.component.css']
})
export class SubNavComponent implements OnInit {
  subNavTitle = "";
  subNavDescription = "";
  subNavInstruction = "";
  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.router.url);
    if(this.router.url === '/' || this.router.url === 'dashboard'){
      this.subNavTitle = "Dashboard";
      this.subNavDescription = "The daily view of your zoo. See your events, logs and more.";
      this.subNavInstruction = "Add more widgets from the widgets menu in settings and make your dashboard work for you.";
    }
  }

}
