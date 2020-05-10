import { Injectable, Res, Body, HttpStatus } from '@nestjs/common';
// tslint:disable-next-line: no-var-requires
const nodemailer = require('nodemailer');

@Injectable()
export class UserService {

  // 发送邮件
  async sendMail(body) {
    const { mail } = body;
    const data = Math.round(Math.random() * 9999 + 3000);
    mailObj(mail, data);
    return data;
  }
}

// 创建发送的对象
const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com', // 发送邮箱的主机
  port: 587, // 端口号
  secure: false, // true for 465,false for other ports
  auth: {
    user: '1466645277@qq.com', // 主方发送的地址
    pass: 'aruwcncvklvjbaah',  // mtp 验证码
  },
});

// 发送给的对象
async function mailObj(mail, msg) {
  // 工厂模式
  const obj = {
    from: ' "验证码" <1466645277@qq.com>', // 人名 + 地址
    to: mail + '', // 对方
    subject: '验证信息', // 标题
    text: '验证码为 ：' + msg + ',在五分钟内有效,请尽快注册', // 信息
    html: '', // html标签文本
  };
  try {
    await transporter.sendMail(obj);
  } catch (error) {
    // tslint:disable-next-line: no-console
    console.log(error);
  }
}
