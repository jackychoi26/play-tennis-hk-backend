const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({
      name: 'error-file',
      filename: './logs/errors.log',
      level: 'error'
    }),
    new transports.File({
      name: 'info-file',
      filename: './logs/info.log',
      level: 'info'
    }),
    new transports.File({ filename: './logs/combined.log' })
  ],
  exceptionHandlers: [
    new transports.File({ filename: './logs/exceptions.log' })
  ],
  rejectionHandlers: [
    new transports.File({ filename: './logs/rejections.log' })
  ]
});

export default logger;
