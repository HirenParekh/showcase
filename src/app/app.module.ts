import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {CardsComponent} from './cards/cards.component';
import {AppRoutingModule} from './app-routing.module';
import {CssPositionComponent} from './css-position/css-position.component';
import {HomeComponent} from './home/home.component';
import {SvgTimeLineComponent} from './svg-time-line/svg-time-line.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardsComponent,
    CssPositionComponent,
    SvgTimeLineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
