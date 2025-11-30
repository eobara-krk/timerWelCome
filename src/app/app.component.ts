import { Component } from '@angular/core';
import { TimerComponent } from './timer.component';

@Component({
  selector: 'app-root',
  template: `<app-timer></app-timer>`,
  styles: [],
  imports: [TimerComponent]
})
export class AppComponent { }
