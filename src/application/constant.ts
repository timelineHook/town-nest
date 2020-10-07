export const tech_config = {
  techDir: `/tmp/nest/tech/img`,
};

export const rsa_config = {
  len: 1024,
  publicPkcs: 'pkcs1-public-pem',
  privatePkcs: 'pkcs1-private-pem'
};

export const redis_config = {
  user_session_expire: 60*60*8,
  user_flag: 'town_session_',
  user_expire: 60*60*8 // 8小时
};

export const mongodb_config = {
  url: 'mongodb://zhangzw:zhangzw@101.200.74.42:27017/nest?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false'
};

export const jwt_config = {
  secret: 'secretKey',
};