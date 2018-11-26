import clock from 'clock';
import document from 'document';
import * as messaging from 'messaging';

clock.granularity = 'seconds';

let hourHand = document.getElementById('hours'),
  minHand = document.getElementById('mins'),
  secHand = document.getElementById('secs'),
  date = document.getElementById('date'),
  month = document.getElementById('month'),
  middle = document.getElementById('middle'),
  secsRect = document.getElementById('secsRect'),
  days = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'],
  months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
  showDay = false,
  showDate = false,
  showMonth = false;

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
    secs = today.getSeconds(),
    dateText = '';

  if (showDay) {
    dateText = dateText += days[today.getDay()]
  }

  if (showDate) {
    dateText = dateText + ' ' + today.getDate();
  }

  date.text = dateText;

  if (showMonth) {
    month.text = months[today.getMonth()];
  } else {
    month.text = '';
  }

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
    date.style.fill = color;
    month.style.fill = color;
  }

  if (evt.data.key === 'showDay' && evt.data.newValue) {
    showDay = JSON.parse(evt.data.newValue);
  }

  if (evt.data.key === 'showDate' && evt.data.newValue) {
    showDate = JSON.parse(evt.data.newValue);
  }

  if (evt.data.key === 'showMonth' && evt.data.newValue) {
    showMonth = JSON.parse(evt.data.newValue);
  }
};
