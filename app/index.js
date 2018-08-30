import clock from 'clock';
import document from 'document';
import * as messaging from 'messaging';

clock.granularity = 'seconds';

let hourHand = document.getElementById('hours'),
  minHand = document.getElementById('mins'),
  secHand = document.getElementById('secs'),
  myDate = document.getElementById('myDate'),
  middle = document.getElementById('middle'),
  secsRect = document.getElementById('secsRect');

function hoursToAngle(hours, minutes) {
  let hourAngle = 360 / 12 * hours,
    minAngle = 360 / 12 / 60 * minutes;
  return hourAngle + minAngle;
}

function minutesToAngle(minutes) {
  return 360 / 60 * minutes;
}

function secondsToAngle(seconds) {
  return 360 / 60 * seconds;
}

function updateClock() {
  let today = new Date(),
    hours = today.getHours() % 12,
    mins = today.getMinutes(),
    secs = today.getSeconds();

  myDate.text = today.getDate();

  hourHand.groupTransform.rotate.angle = hoursToAngle(hours, mins);
  minHand.groupTransform.rotate.angle = minutesToAngle(mins);
  secHand.groupTransform.rotate.angle = secondsToAngle(secs);
}

clock.ontick = () => updateClock();

messaging.peerSocket.onmessage = evt => {
  if (evt.data.key === 'color' && evt.data.newValue) {
    let color = JSON.parse(evt.data.newValue);
    middle.style.fill = color;
    secsRect.style.fill = color;
    myDate.style.fill = color;
  }
};
