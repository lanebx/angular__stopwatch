import {Component, OnInit} from '@angular/core';
import {interval, take} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'stopwatch';
  startStopwatch?: boolean;
  interval: any;
  // @ts-ignore
  time = new Date(null);
  source : any;

  ngOnInit() {
    this.startStopwatch = false;
  }

  startStop() {
    !this.startStopwatch
      ? this.startTimer()
      : this.stopTimer();
  }

  startTimer() {
    this.source = interval(1000)
      .subscribe((val) => {
        this.time.setSeconds(val)
      })

    this.startStopwatch = true;
  }

  stopTimer() {
    // @ts-ignore
    this.time = new Date(null);
    clearInterval(this.interval);

    this.startStopwatch = false;
  }

  waitTimer() {
    this.startStopwatch = false;
    clearInterval(this.interval);
  }

  resetTimer() {
    this.time.setSeconds(0);
  }

  startT() {
    interval(1000)
  }

  stopT() {

  }


}
