interface ExceptionMsg {
    code: number;
    message: string;
    message_en: string;
}

export class TownException extends Error {
    message: string;
    message_en: string;
    code: number;
    data: any

    private constructor(message: string, message_en: string, code: number) {
        super(message);
        this.message = message;
        this.message_en = message_en;
        this.code = code;
    }

    static of(msg: ExceptionMsg){
        return new TownException(msg.message, msg.message_en, msg.code);
    }
}