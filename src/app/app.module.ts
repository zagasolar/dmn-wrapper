import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DmnAssetHandlerComponent } from './dmn-asset-handler/dmn-asset-handler.component';
import { ProjectInitializerComponent } from './project-initializer/project-initializer.component';

@NgModule({
  declarations: [
    AppComponent,
    DmnAssetHandlerComponent,
    ProjectInitializerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
