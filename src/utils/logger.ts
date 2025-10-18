// src/utils/logger.ts
class Logger {
  info(...args: any[]) {
    console.log('[INFO]', ...args);
  }
  error(...args: any[]) {
    console.error('[ERROR]', ...args);
  }
}

export default new Logger(); // Singleton
