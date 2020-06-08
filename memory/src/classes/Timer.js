class Timer {

  constructor(minutes = 0, seconds = 0) {
    this.minutes = minutes;
    this.seconds = seconds;
  }

  // Properties
  timerRef;

  startTimer(callback) {
    this.timerRef = setInterval(() => {
      if (this.seconds < 59) {
        this.seconds++;
      } else {
        this.seconds = 0;
        this.minutes++;
      }

      typeof callback === 'function' && callback();
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.timerRef);
    this.timerRef = undefined;
  }

  resetTimer(callback) {
    this.pauseTimer();
    this.seconds = 0;
    this.minutes = 0
    this.startTimer();
    typeof callback === 'function' && this.startTimer(callback) || this.startTimer()
  }

}
