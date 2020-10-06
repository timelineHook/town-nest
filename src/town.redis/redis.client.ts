import { logger } from '@town/middleware/winston.middleware';
import * as Redis from 'ioredis';

const port = 6379;
const host = '101.200.74.42';
const options = {
    password: 'zhangzw',
    db: 0
};

export const redis = new Redis(port, host, options)
    .on('connect', () => {
        logger.info(`reids 连接成功`);
    })
    .on('error', () => {
        console.log('redis 连接失败');
    });





