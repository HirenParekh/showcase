import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {CardsComponent} from './cards/cards.component';
import {CssPositionComponent} from './css-position/css-position.component';
import {HomeComponent} from './home/home.component';
import {SvgTimeLineComponent} from './svg-time-line/svg-time-line.component';

const routes: Route[] = [
  {path: '', pathMatch:'full',component: HomeComponent},
  {path: 'cards', component: CardsComponent},
  {path: 'css-position', component: CssPositionComponent},
  {path: 'svg-time-line', component: SvgTimeLineComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
  constructor() {

  }
}
