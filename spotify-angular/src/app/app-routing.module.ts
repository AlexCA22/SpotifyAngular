import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '@modules/home/pages/home-page/home-page.component';


const routes: Routes = [
  {
    path:'auth', //localhost:4200/
    //Importa nuestro home en la pag principal
    loadChildren:() =>import(`./modules/auth/auth.module`).then(m=>m.AuthModule)
  },
  {
    path:'', //localhost:4200/
    component: HomePageComponent,
    //Importa nuestro home en la pag principal
    loadChildren:() =>import(`./modules/home/home.module`).then(m=>m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
