import {Component} from '@angular/core';
import {AppProjectBase} from '../app-project-base.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent extends AppProjectBase {
  constructor() {
    super();
    this.addDependencies();
  }

  addDependencies() {
    this.addLinkTagToElementDOM('assets/common/css/bootstrap.min.css');
    this.addLinkTagToElementDOM('assets/common/css/jquery-ui.min.css');
    this.addLinkTagToElementDOM('assets/cards/css/style.css');
    this.addLinkTagToElementDOM('assets/cards/css/cardPanel.css');
    this.addScriptTagToElementDOM('assets/common/js/jquery-ui.min.js');
    this.addScriptTagToElementDOM('assets/common/js/bootstrap.min.js');
    setTimeout(() => {
      this.addScriptTagToElementDOM('assets/cards/js/cards.js');
    }, 100);
    setTimeout(() => {
      this.addScriptTagToElementDOM('assets/cards/js/script.js');
      this.addScriptTagToElementDOM('assets/cards/js/cardPanel.js');
    }, 200);
  }
}
