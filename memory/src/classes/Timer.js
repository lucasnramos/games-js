class Timer {
  timerRef;

  constructor(minutes = 0, seconds = 0) {
    this.minutes = minutes;
    this.seconds = seconds;
  }

  startTimer() {
    this.timerRef = setInterval(() => {
      // Set the correct number to seconds and minutes
      // TODO: prevent minutes from > 59
      if (this.seconds < 59) {
        this.seconds++;
      } else {
        this.seconds = 0;
        this.minutes++;
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.timerRef);
    console.log( this.minutes, this.seconds);
  }

  resetTimer() {
    this.pauseTimer();
    this.seconds = 0;
    this.minutes = 0
  }

}
