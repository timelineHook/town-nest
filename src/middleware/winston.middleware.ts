// winston https://github.com/winstonjs/winston#table-of-contents
// winston-daily-rotate-file https://github.com/winstonjs/winston-daily-rotate-file winston滚动日志
import { createLogger, transports, addColors } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as rTracer from 'cls-rtracer';
import { format } from 'logform';
const logDIr = '/data/logs/nest-pro-bug';
const myFormat = format.printf(({ level, message, timestamp, ms }) => {
    return `${timestamp} ${rTracer.id() ?? "#"} ${level}: ${message} ${ms} \n`;
});
const myCustomLevels = {
    levels: {
        error: 0,
        rejections: 1,
        info: 3
    },
    colors: {
        error: 'red',
        rejections: 'red',
        info: 'green'
    }
};
const option = {
    frequency: '24h', //日志存储频率
    datePattern: 'YYYY-MM-DD', //日志日期格式
    maxSize: '20m', //文件大小
    maxFiles: '14d', //14天
};
const loggerMiddleware = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), //日志日期
        format.errors({ stack: true }), //异常堆栈打印
        format.splat(),
        format.json(),
        format.ms(),
        myFormat //日志打印格式
    ),
    transports: [
        new DailyRotateFile({
            ...option,
            filename: `${logDIr}/app_%DATE%.log`,
            level: 'info',
        }),
        new DailyRotateFile({
            ...option,
            filename: `${logDIr}/error_%DATE%.log`,
            level: 'error',
        }),

    ],
    exitOnError: false, // 处理异常不进程退出
    silent: false, // 开启所有日志
    levels: myCustomLevels.levels //自定义日志等级
});

// // 为自定义日志等级着色
addColors(myCustomLevels.colors);

// 未处理的异常
loggerMiddleware.exceptions.handle(
    new DailyRotateFile({
        ...option,
        filename: `${logDIr}/error_%DATE%.log`,
        level: 'error',
    }),
    new DailyRotateFile({
        ...option,
        filename: `${logDIr}/app_%DATE%.log`,
        level: 'info',
    }),
);

// 未处理的异步异常
(loggerMiddleware as any).rejections.handle(
    new DailyRotateFile({
        ...option,
        filename: `${logDIr}/rejections_%DATE%.log`,
        level: 'rejections',
    })
);

if (process.env.NODE_ENV !== 'production') {
    loggerMiddleware.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple(),
            format.splat(),
            myFormat
        )
    }));
}

// TODO winston 字符串插值bug，暂时先使用自定义方法完成
const custom = {
    ...loggerMiddleware,
    info: (message: string, meta?: string) => {
        loggerMiddleware.info(`${meta ?? 'nest-pro-bug'} => ${message}`);
    },
    error: (message: string, meta?: string) => {
        loggerMiddleware.error(`${meta ?? 'nest-pro-bug'} => ${message}`);
    },
};
custom.info('start winston custom...');
export const logger = custom;