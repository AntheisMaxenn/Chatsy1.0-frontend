import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { StartComponent } from './start/start.component';


const routes: Routes = [
  
  // TODO: Start will handle redirects to chat within own component.

  {path: "", redirectTo: "start", pathMatch: 'full'},
  {path: "start", component: StartComponent},
  {path: "chat", component: ChatComponent},
  {path: '**', redirectTo: 'start'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
