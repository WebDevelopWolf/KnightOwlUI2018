import { Component, OnInit } from '@angular/core';
import { KoapiService } from '../../../koapi.service';
import { Http } from "@angular/http";

@Component({
  selector: 'app-keeper-log-widget',
  templateUrl: './keeper-log-widget.component.html',
  styleUrls: ['./keeper-log-widget.component.css']
})
export class KeeperLogWidgetComponent implements OnInit {

  todaysLog: any;

  constructor(private _koapi: KoapiService) { }

  // Initialise Keeper Log Widget
  ngOnInit() {
    this.getTodaysLog();
  }

  // Get the Keeper Log for today
  getTodaysLog() {
    this._koapi
    .getService("KeeperLog/Today")
    .then((result) => {
      // Add the animal's avatar image to the log
      result.forEach(logEntry => {
        logEntry.animalImage = "assets/dashboard/widgets/keeperlog/" + logEntry.Animal.toLowerCase() + ".png"
      });
      // Push log to the widget
      this.todaysLog = result;
      console.log(this.todaysLog);
    })
    // Catch any API Errors
    .catch(error => console.log(error));
  }

}
