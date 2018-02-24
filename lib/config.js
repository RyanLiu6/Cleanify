const Config = {
  configSchema: {
    dictionary: {
      title: "User Dictionary",
      description:
        "Contains a list of all words a User would like to remove from their given code base.",
      type: "string-list",
      default: ["Fuck", "Shit"]
    },
    deleteComments: {
      title: "Enables Deleting Comments",
      description:
        "If enabled, Cleanfiy will delete the comments that contain a word from user dictionary.",
      type: "boolean",
      default: true
    },
    replaceVariables: {
      title: "Enables Replacing Variables",
      description:
        "If enabled, Cleanfiy will replace variable names that contain a word from user dictionary.",
      type: "boolean",
      default: true
    },
    verbose: {
      title: "Verbose Mode",
      description:
        "If enabled, will print out debug messages",
      type: "boolean",
      default: true
    }
  }
};

export default Config;
