'use babel';

import {
  CompositeDisposable
} from 'atom';

import Config from './config.json';

var fileText = {};

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
      'cleanify:enable': () => this.enable()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  trigger() {
    if (atom.config.get("cleanify.verbose")) {
      var dict = atom.config.get("cleanify.dictionary")

      // for (var i in dict) {
      //   console.log(dict[i])
      // }
    }

    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      var currText = editor.getText()
      var numLines = editor.getLineCount()
      var currLine = ""
      var currNum = 0;

      for (var i = 0; i < currText.length ; ++i) {
          if (currText[i] == '\r') {
              fileText[currNum] = currLine

              // want to skip \r\n lines
              i++
              currNum++
              currLine = ""
          }
          else {
              currLine += currText[i]
          }
      }

      for (var line in fileText) {
          console.log(fileText[line])

          // Check if current line contains a word from Dictionary

          // Check if current line is a comment
      }
    }

  },

  enable() {
    console.log("At Enable")
  }

};
