import {Component} from '@angular/core';
import {AppProjectBase} from '../app-project-base.model';

@Component({
  selector: 'app-svg-time-line',
  templateUrl: './svg-time-line.component.html'
})
export class SvgTimeLineComponent extends AppProjectBase {
  constructor() {
    super();
  }

  ngAfterViewInit() {
    this.addLinkTagToElementDOM('assets/svg-time-line/css/style.css');
    this.addScriptTagToElementDOM('assets/svg-time-line/js/cssua.js');
    this.addScriptTagToElementDOM('assets/svg-time-line/js/script.js');

  }
}
