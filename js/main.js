const refs = {
  days: document.querySelector(' [data-value="days"]'),
  hours: document.querySelector(' [data-value="hours"]'),
  mins: document.querySelector(' [data-value="mins"]'),
  secs: document.querySelector(' [data-value="secs"]'),
  btnStart: document.querySelector('[ data-action="start"]'),
  btnStop: document.querySelector('[ data-action="stop"]'),
};

class CountdownTimer {
  constructor({ onTick, onClear, targetDate }) {
    this.isActive = false;
    this.interval = null;
    this.onTick = onTick;
    this.targetDate = targetDate;
    this.onClear = onClear;
  }

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    this.interval = setInterval(() => {
      const currentDate = Date.now();
      let time = this.targetDate.valueOf() - currentDate;
      const timeComponents = this.getTime(time);
      this.onTick(timeComponents);
    }, 1);
  }

  stop() {
    clearInterval(this.interval);
    this.onClear();
    this.isActive = false;
  }

  getTime(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }

  pad(num) {
    return String(num).padStart(2, 0);
  }
}

const countdownTimer = new CountdownTimer({
  onTick: updateTime,
  onClear: clearTime,
  targetDate: new Date("Oct 11, 2021"),
});

function updateTime({ days, hours, mins, secs }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.mins.textContent = mins;
  refs.secs.textContent = secs;
}

function clearTime() {
  refs.days.textContent = "00";
  refs.hours.textContent = "00";
  refs.mins.textContent = "00";
  refs.secs.textContent = "00";
}

refs.btnStart.addEventListener(
  "click",
  countdownTimer.start.bind(countdownTimer)
);

refs.btnStop.addEventListener(
  "click",
  countdownTimer.stop.bind(countdownTimer)
);
