// 错误处理：输入三个字符串，输出错误字符串
class AirtableError {
    error: string;
    msg: string;
    statusCode: number;

    constructor(error: string, msg: string, statusCode: number) {
        this.error = error;
        this.msg = msg;
        this.statusCode = statusCode;
    }

    toString():string {
        let errArr = [this.msg, '(', this.error, ')', this.statusCode ? `[Http code ${this.statusCode}]` : ''];
        return errArr.join('');
    }
}

export = AirtableError;
