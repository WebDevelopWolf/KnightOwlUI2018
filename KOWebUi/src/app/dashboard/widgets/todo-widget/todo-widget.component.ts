import { Component, OnInit } from '@angular/core';
import { KoapiService } from '../../../koapi.service';
import { Http } from "@angular/http";

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html',
  styleUrls: ['./todo-widget.component.css']
})
export class TodoWidgetComponent implements OnInit {

  todos: any;

  constructor(private _koapi: KoapiService) { }

  ngOnInit() {
    this.getTodo();
  }

  // Get the todo entries for the logged in user from the API
  // TODO: Remove temp user and get logged in user
  getTodo() {
    this._koapi
    .getService("Todos/GetForUser/A239D027-8E5F-4C97-A6A7-FE987317893C")
    .then((result) => {
      result.forEach(element => {
        // Set the coloured priority tag 
        if (element.Priority == 1) {
          element.Priority = "high";
        } else if (element.Priority == 2) {
          element.Priority = "medium"; 
        } else if (element.Priority == 3) {
          element.Priority = "low";
        }
        // Trim the time from the date
        element.ToDoDate = element.ToDoDate.slice(0,-13)
      });
      // Pass to the view
      this.todos = result;
    })
    // Catch any API Errors
    .catch(error => console.log(error));
  }

}
