import { AdminUser } from "./database/user.schema";

let session = null;

interface IExtra {
    ip: string;
    loginType: string;
}

type TSession = AdminUser & IExtra;

export class AdminSession {

    static set session(user: TSession) {
        const entity = {
            _id: user._id,
            createTime: user.createTime,
            image: user.image,
            jobNumber: user.jobNumber,
            loginTime: user.loginTime,
            name: user.name,
            updateTime: user.updateTime,
            username: user.username,
            ip: user.ip,
            loginType: user.loginType
        }
        session = entity;
    }

    static get session() {
        return session;
    }

}
