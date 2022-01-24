import {Component, OnInit} from '@angular/core';
import {
  buffer,
  filter,
  fromEvent,
  interval,
  debounceTime,
} from 'rxjs';
import { delay, take, exhaustMap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  startStopwatch?: boolean;
  time = new Date(0);
  source$: any;
  lastStopedTime: number = 0;
  click$: any;

  ngOnInit() {
    this.startStopwatch = false;
    const waitButton$ = fromEvent(<EventTarget>document.getElementById('waitButton'), 'click');

    const buff$ = waitButton$.pipe(
      debounceTime(300),
    )

    this.click$ = waitButton$.pipe(
      buffer(buff$),
      filter(list => {
        return list.length === 2
      }),
    )
    .subscribe(() => {
      this.waitTimer();
    })
  }

  ngOnDestroy() {
    this.click$.unsubscribe();
    this.source$.unsubscribe();
  }

  startStop() {
    !this.startStopwatch
      ? this.startTimer()
      : this.stopTimer();
  }

  startTimer() {
    this.source$ = interval(1000)
      .subscribe((val) => {
        this.time.setSeconds((this.time.getSeconds() + 1))
      })

    this.startStopwatch = true;
  }

  stopTimer() {
    this.time = new Date(0);
    this.source$.unsubscribe();

    this.startStopwatch = false;
  }

  waitTimer() {
    this.source$.unsubscribe();

    this.startStopwatch = false;
  }

  resetTimer() {
    this.time = new Date(0);
    this.source$.unsubscribe();

    this.startTimer()
  }


}
