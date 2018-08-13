cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.dialogs/www/notification.js",
        "id": "org.apache.cordova.dialogs.notification",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.dialogs/www/android/notification.js",
        "id": "org.apache.cordova.dialogs.notification_android",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/com.phonegap.LowLatencyAudio/www/LowLatencyAudio.js",
        "id": "com.phonegap.LowLatencyAudio.LowLatencyAudio",
        "clobbers": [
            "window.LowLatencyAudio"
        ]
    },
    {
        "file": "plugins/com.rjfun.cordova.plugin.admob/www/AdMob.js",
        "id": "com.rjfun.cordova.plugin.admob.AdMob",
        "clobbers": [
            "window.plugins.AdMob"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.dialogs": "0.2.11",
    "com.phonegap.LowLatencyAudio": "0.1.0",
    "com.rjfun.cordova.plugin.admob": "2.1.7",
    "com.google.playservices": "19.0.0",
    "com.google.admobsdk": "6.12.2"
}
// BOTTOM OF METADATA
});