'use babel';

import {
  CompositeDisposable
} from 'atom';

import Config from './config.json';

export default {
  config: Config,
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
    if (atom.config.get("cleanify.verbose")) {
      var dict = atom.config.get("cleanify.dictionary")

      for (var i in dict) {
        console.log(dict[i])
      }
    }

    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
    let selection = editor.getSelectedText()
    selection = selection.split('').reverse().join('')
    editor.insertText(selection)
    }
  }

};
