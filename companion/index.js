import * as messaging from 'messaging';
import { settingsStorage } from 'settings';

function sendVal(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}

// Restore any previously saved settings and send to the device
function restoreSettings() {
  for (let index = 0; index < settingsStorage.length; index += 1) {
    let key = settingsStorage.key(index);
    if (key) {
      let data = {
        'key': key,
        'newValue': settingsStorage.getItem(key)
      };
      sendVal(data);
    }
  }
}

messaging.peerSocket.onopen = () => {
  restoreSettings();
};

settingsStorage.onchange = evt => {
  let data = {
    'key': evt.key,
    'newValue': evt.newValue
  };
  sendVal(data);
};
