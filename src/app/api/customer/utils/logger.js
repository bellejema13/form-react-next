const { createLogger, format, transports } = require('winston');

function customizedFormat() {
  const formatMessage = info => `${info.level} ${info.message}`;
  const formatError = info =>
    `${info.level} ${info.message}\n\n${info.stack}\n`;
  const formatter = info =>
    info instanceof Error ? formatError(info) : formatMessage(info);
  return format.combine(format.colorize(), format.printf(formatter));
}

export const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  exitOnError: false,
  transports: [new transports.Console()],
  format: customizedFormat(),
});
