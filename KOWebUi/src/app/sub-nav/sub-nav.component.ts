import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, NavigationEnd } from '@angular/router';
import { KoapiService } from '../koapi.service';
import { Http } from "@angular/http";

@Component({
  selector: 'app-sub-nav',
  templateUrl: './sub-nav.component.html',
  styleUrls: ['./sub-nav.component.css']
})
export class SubNavComponent implements OnInit {
  subNavTitle = "";
  subNavDescription = "";
  subNavInstruction = "";
  private heading : any;
  private routeString = "";
  submodules : any;
  dashboards : any;
  constructor(private router: Router, private _koapi: KoapiService) { }

  ngOnInit() {
    // If we're on the root, force this get the dashboard information, if not use the router url
    this.router.events.subscribe(events => {
      if (events instanceof NavigationEnd) {
        var splitUrl = events.url.split("/");
        if (splitUrl[1] === '') {
          this.routeString = "dashboard";
        } else {
          this.routeString = splitUrl[1];
        }
        console.log(this.routeString);
        // Run the KO service to get the header object
        this.getHeader(this.routeString);  
        // Run the KO Service to get the Sub-Modules
        this.getSubModules(this.routeString);
        // TODO: Run the KO Service to get the user's dashboards (if on root or dashboard)
        if (this.routeString == 'dashboard') {
          this.getUserDashboards();
        }
      }
    })

    // TODO: Run the KO Service to get the current user details  
  }

  // Get Sub-Module Heading 
  getHeader(routerurl: any) {
    this._koapi
    .getService("SubModules/Heading/" + routerurl)
    .then((result) => {
      this.heading = result;
      // Fill in the Header information with the header object
      this.subNavTitle = this.heading.ModuleTitle;
      this.subNavDescription = this.heading.Description;
      this.subNavInstruction = this.heading.Instruction;
    })
    .catch(error => console.log(error));
  }

  // Get Sub-Modules
  getSubModules(routerurl: any) {
    this._koapi
    .getService("SubModules/Get/" + routerurl)
    .then((result) => {
      this.submodules = result;
    })
    .catch(error => console.log(error));
  }

  // Get the User's Dashboards
  getUserDashboards() {
    this._koapi
    .getService("Dashboards/Get")
    .then((result) => {
      this.dashboards = result;
    })
    .catch(error => console.log(error));
  }

  // TODO: Get Current User Details

  // TODO: Log out Current User

}
