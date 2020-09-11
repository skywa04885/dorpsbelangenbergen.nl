import winston from 'winston';

/**
 * Creates an new winston logger with our default configuration
 * @param label the label which will be shown in the console
 */
const createSimpleLogger = (label: string): winston.Logger => {
  return winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.label({ label }),
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          winston.format.printf(info => `${info.timestamp} ${info.level}@${info.label}: ${info.message}`)
        ),
      }),
    ]
  });
};

export { createSimpleLogger };
