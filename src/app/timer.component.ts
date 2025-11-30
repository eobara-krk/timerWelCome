import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  timerDisplay = '--:--';
  status = 'Ładowanie...';
  private intervalId: any;

  private START_HOUR = 9;
  private START_MIN = 15;
  private END_HOUR = 9;
  private END_MIN = 30;

  ngOnInit() {
    this.updateTimer();
    this.intervalId = setInterval(() => this.updateTimer(), 250);
  }

  private getTodayTime(hour: number, min: number) {
    const d = new Date();
    d.setHours(hour, min, 0, 0);
    return d;
  }

  private updateTimer() {
    const now = new Date();
    const start = this.getTodayTime(this.START_HOUR, this.START_MIN);
    const end = this.getTodayTime(this.END_HOUR, this.END_MIN);

    if (now < start) {
      const diffSec = Math.floor((start.getTime() - now.getTime()) / 1000);
      this.timerDisplay = this.formatTime(diffSec);
      this.status = 'Oczekiwanie na start';
    } else if (now >= start && now < end) {
      const diffSec = Math.floor((end.getTime() - now.getTime()) / 1000);
      this.timerDisplay = this.formatTime(diffSec);
      this.status = 'Spotkanie trwa';
    } else {
      this.timerDisplay = '00:00';
      this.status = 'Spotkanie zakończone';
      this.playAlarm();
      clearInterval(this.intervalId);
    }
  }

  private formatTime(sec: number) {
    const min = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(min).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }

  private playAlarm() {
    const audio = new Audio('assets/gong.ogg');
    audio.play();
  }
}
