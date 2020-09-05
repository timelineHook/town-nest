// winston https://github.com/winstonjs/winston#table-of-contents
// winston-daily-rotate-file https://github.com/winstonjs/winston-daily-rotate-file winston滚动日志
import { createLogger, format, transports, addColors } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
const date = () => {
    const myDate = new Date(); //实例一个时间对象；
    const y = myDate.getFullYear(); //获取系统的年；
    const m = myDate.getMonth() + 1; //获取系统月份，由于月份是从0开始计算，所以要加1
    const d = myDate.getDate(); // 获取系统日，
    const h = myDate.getHours(); //获取系统时，
    const miu = myDate.getMinutes(); //分
    const s = myDate.getSeconds(); //秒
    return `${y}-${m}-${d} ${h}:${miu}:${s}`;
};
const myFormat = format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: [ ${message} ]`;
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
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.colorize({ all: true }), //日志着色
        // format.prettyPrint({colorize: true}), //性能影响
        format.align(), //字符对齐
        format.splat(), //字符串模板
        format.simple(), //格式化日志
        format.errors({ stack: true }), //异常堆栈打印
        format.timestamp({ alias: 'time', format: date() }), //日志日期
        myFormat //日志打印格式
    ),
    defaultMeta: { service: 'nest-pro-bug' }, //标头
    transports: [
        // new transports.File({
        //     filename: 'logs/error.log',
        //     level: 'error',
        // }),
        // new transports.File({
        //     filename: 'logs/app.log',
        // }),
        new DailyRotateFile({
            ...option,
            filename: 'logs/app_%DATE%.log',
            level: 'info',
        }),
        new DailyRotateFile({
            ...option,
            filename: 'logs/error_%DATE%.log',
            level: 'error',
        }),
        
    ],
    exitOnError: false, // 处理异常不进程退出
    silent: false, // 开启所有日志
    levels: myCustomLevels.levels //自定义日志等级
});

// 为自定义日志等级着色
addColors(myCustomLevels.colors);

// 未处理的异常
logger.exceptions.handle(
        new DailyRotateFile({
            ...option,
            filename: 'logs/error_%DATE%.log',
            level: 'error',
        }),
        new DailyRotateFile({
            ...option,
            filename: 'logs/app_%DATE%.log',
            level: 'info',
        }),
);

// 未处理的异步异常
(logger as any).rejections.handle(
    new DailyRotateFile({
        ...option,
        filename: 'logs/rejections_%DATE%.log',
        level: 'rejections',
    })
);

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple()
        )
    }));
}

logger.info('request 2020-08-30 15:39:57 Get');
if (true) {
    logger.error('发生异常了');
}
throw new Error('这是一个同步异常');
// new Promise((r, d)=>{
//     throw new Error('未捕获的异步异常');
// })
// export const log = logger;