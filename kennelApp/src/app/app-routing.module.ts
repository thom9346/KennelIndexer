import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NameIndexComponent } from './pages/name-index/name-index.component'


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/names' },
   {path: 'names', component: NameIndexComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
