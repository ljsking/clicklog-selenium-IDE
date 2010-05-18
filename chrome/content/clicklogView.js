/*
 * Copyright 2005 Shinya Kasatani
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

function ClicklogView(editor, textbox) {
	this.log = new Log("ClicklogView");
	this.textbox = textbox;
	this.editor = editor;
    this.sizeClickLog = 0;
}
ClicklogView.prototype = {
    scrollToRow: function(index) {
		// TODO
	},
	rowInserted: function(rowIndex) {
        this.log.debug("updateView: testCase=" + this.testCase);
        var scrollTop = this.textbox.inputField.scrollTop;
        var cmd = this.testCase.commands[rowIndex];
        if(/clickLog[a-zA-Z]*\s*/.test(cmd["command"])){
            this.textbox.value=cmd["target"]+"\n"+this.textbox.value;
            this.textbox.inputField.scrollTop = scrollTop;
        }
        
	},
	rowUpdated: function(index) {
	},
	refresh: function() {
	},
	// synchronize model from view
	syncModel: function(force) {
		this.log.debug("skip syncModel");
	},
	onHide: function() {
	},
	getRecordIndex: function() {
		return this.testCase.commands.length;
	}
}
ClicklogView.prototype.updateView = function() {
	//log.debug("source=" + getSource());
}