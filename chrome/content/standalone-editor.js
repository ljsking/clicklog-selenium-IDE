/*
 * Copyright 2008 Shinya Kasatani
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * Standalone UI of Selenium IDE.
 */

function StandaloneEditor(window) {
    Editor.call(this, window);
}

objectExtend(StandaloneEditor.prototype, Editor.prototype);

StandaloneEditor.nsIHttpActivityObserver = Components.interfaces.nsIHttpActivityObserver;
    
StandaloneEditor.activityDistributor = Components.classes["@mozilla.org/network/http-activity-distributor;1"]
    .getService(Components.interfaces.nsIHttpActivityDistributor);
    
StandaloneEditor.prototype.registerRecorder = function() {
    // Define a reference to the interface
    Recorder.registerAll(this);
    StandaloneEditor.httpObserver =
    {
        observeActivity: function(aHttpChannel, aActivityType, aActivitySubtype, aTimestamp, aExtraSizeData, aExtraStringData)
        {
          if (aActivityType == StandaloneEditor.nsIHttpActivityObserver.ACTIVITY_TYPE_HTTP_TRANSACTION) {
            switch(aActivitySubtype) {
              case StandaloneEditor.nsIHttpActivityObserver.ACTIVITY_SUBTYPE_REQUEST_HEADER:
                var stringdata = aExtraStringData.split('\n');
                var host = /Host: (.+)/.exec(stringdata[1])[1];
                if(host == 'cr.naver.com'){
                    var GET = stringdata[0];
                    var clicklog = /&a=(.*?)&/.exec(GET)[1];
                    var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
                    var e = wm.getEnumerator("navigator:browser");
                    var wnd;
                    var recorder = false;
                    while (e.hasMoreElements()) {
                        wnd = e.getNext();
                        var browsers = wnd.getBrowser().browsers;
                        for (var i = 0; i < browsers.length; i++) {
                            recorder = Recorder.get(browsers[i].contentWindow);
                            
                        }
                    }
                    if(recorder){
                        recorder.record("clickLog", clicklog, '');
                        StandaloneEditor.httpObserver.clicklog = clicklog;
                    }
                }
                break;
            }
          }
        }
    };
    StandaloneEditor.activityDistributor.addObserver(StandaloneEditor.httpObserver);
}

StandaloneEditor.prototype.deregisterRecorder = function() {
    Recorder.deregisterAll(this);
    StandaloneEditor.activityDistributor.removeObserver(StandaloneEditor.httpObserver);
}

SidebarEditor.prototype.isSidebar = function() {
    return false;
}
