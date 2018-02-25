import { Component, NgModule, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent {

  options = {
    position: ['top', 'right'],
    timeOut: 7500,
    lastOnBottom: true,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    theClass: 'shadow-base',
    animate: 'scale'
  };

  constructor(
    private notifications: NotificationsService
  ) { }

  displaySuccess(title: string, msg: string) {
    this.notifications.success(title, msg);
  }

  displayError(title: string, msg: string, timeout: boolean) {
    if (timeout) {
      this.notifications.error(title, msg);
    } else {
      this.notifications.error(
        title,
        msg,
        {
          timeOut: 0,
          clickToClose: true
        }
      );
    }
  }

  displayConnectionError() {
    this.displayError('Connection Failed', 'Could not connect to the server!', false);
  }

  displayRegexError() {
    this.displayError('Regex Error', 'The Regex did not match the License Text. Please double check your Regex code.', true);
  }

}
