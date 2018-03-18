import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KoapiService } from '../koapi.service';
import { Http } from "@angular/http";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  id: number;
  private sub: any;
  private dash: any;
  dashTitle : any;
  showWelcome : any;
  showWidgets : any;
  zkEventCount: any;
  bopEventCount: any;
  otherEventCount: any;
  showSocialWidget: any;
  showTodoWidget: any;
  showKeeperLogWidget: any;

  constructor(private route: ActivatedRoute, private _koapi: KoapiService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getCurrentDash(this.id);
      this.getEventCounts();
      this.getEnabledWidgets();
   });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // Get the User's Current Dashboard
  getCurrentDash(dashNo: any) {
    this._koapi
    .getService("Dashboards/Get/" + dashNo)
    .then((result) => {
      this.dash = result;
      this.dashTitle = this.dash.DashName;
      this.showWelcome = this.dash.ShowWelcome;
      this.showWidgets = this.dash.ShowWidgets;
    })
    .catch(error => console.log(error));
  }

  // Get the User's Current Dashboard
  getEventCounts() {
    this.zkEventCount = 0;
    this.bopEventCount = 0;
    this.otherEventCount = 0;
    this._koapi
    .getService("Dashboards/EventCount")
    .then((result) => {
      if (typeof result !== 'undefined' && result.length > 0) {
        this.zkEventCount = result[0].count;
        this.bopEventCount = result[1].count;
        this.otherEventCount = result[2].count;
      }
    })
    .catch(error => console.log(error));
  }

  // Get Enabled Widgets
  getEnabledWidgets() {
    this._koapi
    .getService("Dashboards/Widgets")
    .then((result) => {
      this.showSocialWidget = result[2].Enabled;
      this.showTodoWidget = result[0].Enabled;
      this.showKeeperLogWidget = result[1].Enabled;
    })
    .catch(error => console.log(error));
  }

}
