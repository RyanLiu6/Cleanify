'use babel';

import {
  CompositeDisposable
} from 'atom';

import Config from './config.json';
import Utils from './utils';

var fileText = {};
var userDict, delCom, repVar, verbose;

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

    if (verbose) {
      console.log("Triggered")

      // for (var i in userDict) {
      //   console.log(userDict[i])
      // }
    }

    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      var currText = editor.getText()
      var numLines = editor.getLineCount()
      var currLine = ""
      var currNum = 0;

      for (var i = 0; i < currText.length ; ++i) {
          if (currText[i] == '\r' || currText[i] == '\n') {
              fileText[currNum] = currLine

              // want to skip \r\n or \n lines
              i++
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
            if(currLine.includes(checkStr)) {
              // Check if current line is a comment (C/C++)
              if (currLine.substring(0, 2) == "//" && delCom) {
                delete fileText[line]
                break
              }

              if (repVar) {
                fileText[line] = currLine.replace(checkStr, "REPLACE")
                break
              }
            }
          }
      }

      var currText = ""
      for (var line in fileText) {
        currText+=fileText[line]
      }

      editor.setText(currText)

      if (verbose) {
        Utils.showBuffer(fileText)
      }
    }

  },

  toggle() {
    verbose = atom.config.get("cleanify.verbose")
    if (verbose) {
    console.log("At toggle")
    }
  }

};
