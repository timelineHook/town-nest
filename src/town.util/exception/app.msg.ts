// 1000-2000
export class MsgPool {
    // 用户
    static user_no_found = { code: 1000, message: '用户未找到', message_en: 'user no found' };
    static user_pass_invalid = { code: 1002, message: '用户密码错误', message_en: 'user pass invalid' };
    static user_is_repart = { code: 1003, message: '用户已存在', message_en: 'user is repeat' };
    static user_no_login = { code: 1004, message: '用户未登录', message_en: 'user no login' };

    // 通用
    static avatar_must_picture = { code: 2000, message: '上传的头像必须是图片', message_en: 'avatar must be png/jpg/jpeg' };
    static avatar_must_less_than_2m = { code: 2001, message: '上传的头像必须小于2m', message_en: 'avatar must lte 2m' };
    static avatar_404 = { code: 2002, message: '头像不存在', message_en: 'avatar no cound' };
    static picture_404 = { code: 2003, message: '图片不存在', message_en: 'picture no cound' };
}