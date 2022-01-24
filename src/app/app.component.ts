import { Component, OnInit } from '@angular/core';
import {buffer, filter, fromEvent, interval, Observable, throttleTime, merge, debounceTime, map} from 'rxjs';
import { delay, take, exhaustMap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'stopwatch';
  startStopwatch?: boolean;
  // @ts-ignore
  time = new Date(null);
  source$ : any;
  clicks = fromEvent(document, 'click');
  lastStopedTime: any = 0;

  ngOnInit() {
    this.startStopwatch = false;

    // @ts-ignore
    const waitButton$ = fromEvent(document.getElementById('waitButton'), 'click')

    const buff$ = waitButton$.pipe(
      debounceTime(300),
    )

    const click$ = waitButton$.pipe(
      buffer(buff$),
      map(list => {
        return list.length;
      }),
      filter(x => x === 2),
    )
    .subscribe(() => {
      this.waitTimer();
    })
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
    // @ts-ignore
    this.time = new Date(null);
    this.source$.unsubscribe();

    this.startStopwatch = false;
  }

  waitTimer() {
    this.source$.unsubscribe();

    this.startStopwatch = false;
  }

  resetTimer() {
    // @ts-ignore
    this.time = new Date(null);
    this.source$.unsubscribe();

    this.startTimer()
  }
}
