import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes : Routes = [
  {
    path: '',
    children: [
      {path: 'home', component: HomeComponent},
      {path: '**', redirectTo: 'home'}
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class LayoutRoutingModule { }
