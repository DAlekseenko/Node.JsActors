import { createTransport } from 'nodemailer';
import { IActor, EmailMessage } from './IActor';
import config from '../config';

const FROM = 'robot@proekt-xolod.ru';

class Mailer implements IActor {

  private transport;

  constructor() {
    console.log('Start actor: Mailer');
    this.transport = createTransport(config);
  }

  async message({ to, subject, message }: EmailMessage) {
    const mail = { from: FROM, to, subject, text: message };
    this.transport.sendMail(mail, (error, data) => {
      if (error) console.log({ error });
      else console.log(`Email sent: ${data.response}`);
    });
  }

  async exit() {
    this.transport.close();
    console.log('Stop actor: Mailer');
  }
}

export default Mailer;
