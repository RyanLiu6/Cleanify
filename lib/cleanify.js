'use babel';

import {
  CompositeDisposable
} from 'atom';

import Config from './config.json';
import Utils from './utils';

var fileText = {};
var userDict, delCom, repVar, verbose;
var changed = false, toggled = false;

export default {
  config: Config,
  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register trigger
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'cleanify:trigger': () => this.trigger()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'cleanify:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  trigger() {
    userDict = atom.config.get("cleanify.dictionary")
    delCom = atom.config.get("cleanify.deleteComments")
    repVar = atom.config.get("cleanify.replaceVariables")
    verbose = atom.config.get("cleanify.verbose")
    changed = false

    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      var currText = editor.getText()
      var currLine = ""
      var currNum = 0

      for (var i = 0; i < currText.length ; ++i) {
          if (currText[i] == '\n') {
              fileText[currNum] = currLine
              currNum++
              currLine = ""
          }
          else {
              currLine += currText[i]
          }
      }

      for (var line in fileText) {
          currLine = fileText[line]
          // Check if current line contains a word from userDictionary
          var checkStr = ""
          for (var word in userDict) {
            checkStr = userDict[word]

            // if the userDictionary word exists
            if(currLine.toLowerCase().includes(checkStr.toLowerCase())) {
              // TODO: Add Notification to show user which words were replaced
              // at individual lines
              atom.notifications.addInfo("Found Instance(s) of " + checkStr + " in: " + currLine)

              // Check if current line is a comment (C/C++)
              if (currLine.substring(0, 2) == "//" && delCom) {
                // TODO: Support backspace isntead of just deleting the line in the buffer
                delete fileText[line]
                changed = true
                break
              }

              if (repVar) {
                fileText[line] = currLine.replace(new RegExp(checkStr + '*', 'ig'), "REPLACE")
                changed = true
                break
              }
            }
          }
      }

      if (changed) {
          currText = ""
          for (var line in fileText) {
              currText += (fileText[line] + '\n')
          }

          editor.setText(currText)
      }

      for (var member in fileText) delete fileText[member];

      editor.save()

      // if (verbose) {
      //   Utils.showBuffer(fileText)
      // }
    }

  },

  toggle() {
    verbose = atom.config.get("cleanify.verbose")
    if (verbose) {
    console.log("At toggle")
    }

    toggled = !toggled
    if (toggled) {
      atom.notifications.addSuccess("Successfully Enabled Cleanify")
    }
    else {
      atom.notifications.addSuccess("Successfully Disabled Cleanify")
    }
  }
};
