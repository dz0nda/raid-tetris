import { createLogger, transports } from 'winston';

var logger = createLogger(
    {
        level: 'info',
        transports: [
            new (transports.Console)()
        ]
    },
    {
        level: 'error',
        transports: [
            new (transports.Console)()
        ]
    }
);

export default logger;

// winston.clear();
// winston.add(winston.transports.Console, { colorize: true, prettyPrint: true });

// module.exports = winston;

// import winston from 'winston';

// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   transports: [
//     new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
//     new winston.transports.File({ filename: './logs/combined.log' }),
//   ],
// });

// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.simple(),
//   }));
// }

// module.exports = logger;
