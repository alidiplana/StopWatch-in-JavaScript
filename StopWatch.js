class StopWatch {
  constructor(
    nanoSeconds = 0,
    miliSeconds = 0,
    seconds = 0,
    minutes = 0,
    hours = 0,
    status
  ) {
    this.nanoSeconds = nanoSeconds;
    this.miliSeconds = miliSeconds;
    this.seconds = seconds;
    this.minutes = minutes;
    this.hours = hours;
    this.status = status;
  }
}

let sw = new StopWatch();
let splits = [];

let status = false;

const stopWatch = () => {
  sw.seconds++;

  if (sw.seconds / 60 == 1) {
    sw.seconds = 0;
    sw.minutes++;

    if (sw.minutes / 60 == 1) {
      sw.minutes = 0;
      sw.hours++;
    }
  }
  document.getElementById("display").innerHTML =
    (sw.hours < 10 ? "0" + sw.hours : sw.hours) +
    ":" +
    (sw.minutes < 10 ? "0" + sw.minutes : sw.minutes) +
    ":" +
    (sw.seconds < 10 ? "0" + sw.seconds : sw.seconds) +
    ":" +
    sw.miliSeconds;
  document.getElementById("nano").innerHTML = +(sw.nanoSeconds < 10
    ? "0" + sw.nanoSeconds
    : sw.nanoSeconds);
};

const miliSecondsHandler = () => {
  sw.miliSeconds++;
  if (sw.miliSeconds / 10 == 1) {
    sw.miliSeconds = 0;
  }
  document.getElementById("display").innerHTML =
    (sw.hours < 10 ? "0" + sw.hours : sw.hours) +
    ":" +
    (sw.minutes < 10 ? "0" + sw.minutes : sw.minutes) +
    ":" +
    (sw.seconds < 10 ? "0" + sw.seconds : sw.seconds) +
    ":" +
    sw.miliSeconds;
  document.getElementById("nano").innerHTML = +(sw.nanoSeconds < 10
    ? "0" + sw.nanoSeconds
    : sw.nanoSeconds);
};
const nanoSecondsHandler = () => {
  sw.nanoSeconds++;
  if (sw.nanoSeconds / 100 == 1) {
    sw.nanoSeconds = 0;
  }
  document.getElementById("display").innerHTML =
    (sw.hours < 10 ? "0" + sw.hours : sw.hours) +
    ":" +
    (sw.minutes < 10 ? "0" + sw.minutes : sw.minutes) +
    ":" +
    (sw.seconds < 10 ? "0" + sw.seconds : sw.seconds) +
    ":" +
    sw.miliSeconds;
  document.getElementById("nano").innerHTML = +(sw.nanoSeconds < 10
    ? "0" + sw.nanoSeconds
    : sw.nanoSeconds);
};

const startWatch = () => {
  if (status == false) {
    nanoInterval = window.setInterval(nanoSecondsHandler, 10);
    miliInterval = window.setInterval(miliSecondsHandler, 100);
    interval = window.setInterval(stopWatch, 1000);
    status = true;
  }
};

const pauseWatch = () => {
  if (status == true) {
    window.clearInterval(interval);
    window.clearInterval(miliInterval);
    window.clearInterval(nanoInterval);

    document.getElementById("display").innerHTML =
      (sw.hours < 10 ? "0" + sw.hours : sw.hours) +
      ":" +
      (sw.minutes < 10 ? "0" + sw.minutes : sw.minutes) +
      ":" +
      (sw.seconds < 10 ? "0" + sw.seconds : sw.seconds) +
      ":" +
      sw.miliSeconds;
    document.getElementById("nano").innerHTML = +(sw.nanoSeconds < 10
      ? "0" + sw.nanoSeconds
      : sw.nanoSeconds);
    status = false;
  }
};

const resetWatch = () => {
  sw.nanoSeconds = 0;
  sw.miliSeconds = 0;
  sw.seconds = 0;
  sw.minutes = 0;
  sw.hours = 0;
  splits = [];

  document.getElementById("display").innerHTML =
    (sw.hours < 10 ? "0" + sw.hours : sw.hours) +
    ":" +
    (sw.minutes < 10 ? "0" + sw.minutes : sw.minutes) +
    ":" +
    (sw.seconds < 10 ? "0" + sw.seconds : sw.seconds) +
    ":" +
    sw.miliSeconds;
  document.getElementById("nano").innerHTML = +(sw.nanoSeconds < 10
    ? "0" + sw.nanoSeconds
    : sw.nanoSeconds);
};

const splitWatch = () => {
  let tempHours = 0;
  let tempMiliSeconds = 0;
  let tempMinutes = 0;
  let tempSeconds = 0;
  let tempNanoSeconds = 0;

  if (splits.length == 0) {
    let newSW = new StopWatch(
      sw.nanoSeconds,
      sw.miliSeconds,
      sw.seconds,
      sw.minutes,
      sw.hours,
      status
    );
    splits.push(newSW);
  } else {
    if (sw.hours - splits[splits.length - 1].hours < 0) {
      tempHours = sw.hours - splits[splits.length - 1].hours;
    } else {
      tempHours = sw.hours - splits[splits.length - 1].hours;
    }

    if (sw.minutes - splits[splits.length - 1].minutes < 0) {
      tempMinutes = 60 - (sw.minutes - splits[splits.length - 1].minutes);
      tempHours++;
    } else {
      tempMinutes = sw.minutes - splits[splits.length - 1].minutes;
    }

    if (sw.seconds - splits[splits.length - 1].seconds < 0) {
      tempSeconds = 60 - (sw.seconds - splits[splits.length - 1].seconds);
      tempMinutes++;
    } else {
      tempSeconds = sw.seconds - splits[splits.length - 1].seconds;
    }

    if (sw.miliSeconds - splits[splits.length - 1].miliSeconds < 0) {
      tempMiliSeconds =
        10 - (sw.miliSeconds - splits[splits.length - 1].miliSeconds);
      tempSeconds++;
    } else {
      tempMiliSeconds = sw.miliSeconds - splits[splits.length - 1].miliSeconds;
    }

    if (sw.nanoSeconds - splits[splits.length - 1].nanoSeconds < 0) {
      tempNanoSeconds =
        100 - (sw.nanoSeconds - splits[splits.length - 1].nanoSeconds);
      tempMiliSeconds++;
    } else {
      tempNanoSeconds = sw.nanoSeconds - splits[splits.length - 1].nanoSeconds;
    }

    let newSW = new StopWatch(
      tempNanoSeconds,
      tempMiliSeconds,
      tempSeconds,
      tempMinutes,
      tempHours,
      status
    );
    splits.push(newSW);
    console.log("Hours: " + tempHours);
    console.log("Minutes: " + tempMinutes);
    console.log("Seconds: " + tempSeconds);
    console.log("MiliSeconds: " + tempMiliSeconds);
    console.log("NanoSeconds: " + tempNanoSeconds);
  }

  let table = document.getElementById("myTable");
  table.innerHTML = "";
  for (let i = 0; i < splits.length; i++) {
    let row = `<tr>
                      <td>${i + 1}</td>
                      <td>${
                        (splits[i].hours < 10
                          ? "0" + splits[i].hours
                          : splits[i].hours) +
                        ":" +
                        (splits[i].minutes < 10
                          ? "0" + splits[i].minutes
                          : splits[i].minutes) +
                        ":" +
                        (splits[i].seconds < 10
                          ? "0" + splits[i].seconds
                          : splits[i].seconds) +
                        ":" +
                        splits[i].miliSeconds +
                        (splits[i].nanoSeconds < 10
                          ? "0" + splits[i].nanoSeconds
                          : splits[i].nanoSeconds)
                      }</td>
                      <td>${splits[i].status == true ? "Split" : "Paused"}</td>
                </tr>`;
    table.innerHTML += row;
  }
};
