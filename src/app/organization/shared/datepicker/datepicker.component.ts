import { Component, OnInit } from '@angular/core';

import { ScreenService } from '../../../core/screen.service';
import { DatepickerService } from './datepicker.service';

@Component({
  selector: 'vmo-datepicker',
  templateUrl: 'datepicker.component.html',
  styleUrls: ['datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  todaysDate: Date;
  after: Date;
  before: Date;
  mobile: boolean;

  constructor(public datepicker: DatepickerService,
              private screenService: ScreenService) {}

  ngOnInit(): void {
    this.todaysDate = new Date();

    this.datepicker.range.subscribe(range => {
      [this.after, this.before] = range;
    });

    this.screenService.asObservable().subscribe(breakpoint => {
      this.mobile = breakpoint === 'xs' || breakpoint === 'sm';
    });
  }

  update(after, before): void {
    this.datepicker.set(after, before);
  }
}
