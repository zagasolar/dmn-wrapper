import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DmnAssetHandlerComponent } from './dmn-asset-handler/dmn-asset-handler.component';
import { ProjectInitializerComponent } from './project-initializer/project-initializer.component';

const routes: Routes = [
  {path: '', component: ProjectInitializerComponent},
  {path: 'dmnasset', component: DmnAssetHandlerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
