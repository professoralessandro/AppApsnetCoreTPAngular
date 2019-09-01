import { Component, OnInit } from '@angular/core';

import { timer, Subject } from 'rxjs';
import { AlertService } from './alert.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'alert',
  templateUrl: 'alert.component.html'
})
export class AlertComponent {
  message: any;
  ticks: number;
  subject = new Subject();

  constructor(private alertService: AlertService) {
    this.ticks = 0;
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });

    const time = timer(20000);

    time.subscribe(t => {
      this.setFormData();
    });
  }

  private setFormData() {
    this.message = '';
    this.subject.next();
  }
}
