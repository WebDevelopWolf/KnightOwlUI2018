import { Component } from '@angular/core';
import { KoapiService } from './koapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [KoapiService]
})
export class AppComponent {
  title = 'app';
}
