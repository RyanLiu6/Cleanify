// Configs to handle user dictionary

const Config = {
  getJson(key: string, _default: Object = {}) {
    const value = atom.config.get(`Cleanify.${key}`);
    if (!value || typeof value !== "string") return _default;
    try {
      return JSON.parse(value);
    } catch (error) {
      const message = `Your Cleanify config is broken: ${key}`;
      atom.notifications.addError(message, { detail: error });
    }
    return _default;
  }
};

export default Config;
