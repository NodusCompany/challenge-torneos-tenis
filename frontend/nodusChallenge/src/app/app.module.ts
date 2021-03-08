import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GrandSlamViewerComponent } from './grand-slam-viewer/grand-slam-viewer.component';
import { GrandSlamComponent } from './grand-slam/grand-slam.component';

//Import de httpModule 
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GrandSlamViewerComponent,
    GrandSlamComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
