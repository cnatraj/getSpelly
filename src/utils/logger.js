// Environment check
const isDevelopment = import.meta.env.MODE === "development";

class Logger {
  static debug(...args) {
    if (isDevelopment) {
      console.log("[DEBUG]", ...args);
    }
  }

  static info(...args) {
    if (isDevelopment) {
      console.log("[INFO]", ...args);
    }
  }

  static warn(...args) {
    // We keep warnings in production but with a different prefix
    const prefix = isDevelopment ? "[WARN]" : "[W]";
    console.log(prefix, ...args);
  }

  static error(...args) {
    // We always log errors, they're important
    const prefix = isDevelopment ? "[ERROR]" : "[E]";
    console.log(prefix, ...args);
  }

  // For temporary debugging - these will stand out in dev tools
  static todo(...args) {
    if (isDevelopment) {
      console.log("%c[TODO]", "background: #222; color: #bada55", ...args);
    }
  }
}

export default Logger;
