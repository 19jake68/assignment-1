import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynaFormComponent } from './dyna-form/dyna-form/dyna-form.component';

const routes: Routes = [
  {
    path: '',
    component: DynaFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
