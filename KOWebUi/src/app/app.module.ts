import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { SubNavComponent } from './sub-nav/sub-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SocialWidgetComponent } from './dashboard/widgets/social-widget/social-widget.component';
import { TodoWidgetComponent } from './dashboard/widgets/todo-widget/todo-widget.component';
import { KeeperLogWidgetComponent } from './dashboard/widgets/keeper-log-widget/keeper-log-widget.component';
import { InboxComponent } from './messages/inbox/inbox.component';
import { ModalComponent } from './utilities/modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SubNavComponent,
    DashboardComponent,
    SocialWidgetComponent,
    TodoWidgetComponent,
    KeeperLogWidgetComponent,
    InboxComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
