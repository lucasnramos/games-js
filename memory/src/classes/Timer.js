// TODO: this will be the timer. probably with OOP
export class Timer {
  timer;
  constructor() {}

  startTimer() {
    let minutes = 0;
    let seconds = 0;
    const minutesDOM = document.getElementById("timer-minutes");
    const secondsDOM = document.getElementById("timer-seconds");

    timer = setInterval(() => {
      // Set the correct number to seconds and minutes
      // TODO: prevent minutes from > 59
      if (seconds < 59) {
        seconds++;
      } else {
        seconds = 0;
        minutes++;
      }
      // update DOM

      if (minutes < 10) {
        minutesDOM.textContent = `0${minutes}: `;
      } else {
        minutesDOM.textContent = `${minutes}: `;
      }
      if (seconds < 10) {
        secondsDOM.textContent = "0" + seconds;
      } else {
        secondsDOM.textContent = seconds;
      }

      console.log(`${minutes}: ${seconds}`);
    }, 1000);
  }

  stopTimer() {
    clearInterval(timer);
  }
}
