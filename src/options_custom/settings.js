window.addEvent("domready", function () {
  new FancySettings.initWithManifest(function (settings) {
    for(var el in settings.manifest){
      console.log(settings);
      // ensure that any settings change detected will notify background.js
      settings.manifest[el].addEvent("action", function(){
        console.log("Sending message updatedSettingsBabelFrog");
        chrome.runtime.sendMessage({
          msgId: "updatedSettingsBabelFrog",
        });
      });
    };

    settings.manifest["persistent"].addEvent("action", function(value){
      if (!value) {
        //TODO: remove permissions
        return;
      }

      chrome.permissions.request({origins: ['http://*/*', 'https://*/*']}, function(result) {
        if (result) { console.log('SO host permission granted!'); }
      });
    });
  });
});
