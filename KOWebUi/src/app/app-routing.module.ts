import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InboxComponent } from './messages/inbox/inbox.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard/1', pathMatch:'full'},
  {path: 'dashboard', redirectTo: '/dashboard/1', pathMatch:'full'},
  {path: 'dashboard/:id', component: DashboardComponent },
  {path: 'messages', redirectTo: '/messages/inbox', pathMatch:'full'},
  {path: 'messages/inbox', component: InboxComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
