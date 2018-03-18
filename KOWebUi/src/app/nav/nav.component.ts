import { Component, OnInit } from '@angular/core';
import { KoapiService } from '../koapi.service';
import { Http } from "@angular/http";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  modules: any;

  constructor(private _koapi: KoapiService) { }

  ngOnInit() {  
    // Inisitalise Knight Owl Navigation
    this.getEnabledModules();
  }

  // Get Enabled Modules 
  getEnabledModules() {
    this._koapi
    .getService("Modules/Get")
    .then((result) => {
      this.modules = result; 
    })
    .catch(error => console.log(error));
  }

}
