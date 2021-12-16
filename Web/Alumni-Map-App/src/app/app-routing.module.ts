import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'home/landing',
  //   pathMatch: 'full'
  // },
  {
    path: 'home',
    component: FilterBarComponent,
    children: [
      {
        path: 'landing',
        component: LandingPageComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
