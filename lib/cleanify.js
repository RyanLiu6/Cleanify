'use babel';

import {
  CompositeDisposable
} from 'atom';

// import Config from "./config";

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'cleanify:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  toggle() {
    console.log("At toggle")
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
    let selection = editor.getSelectedText()
    selection = selection.split('').reverse().join('')
    editor.insertText(selection)
    }
  }

};
