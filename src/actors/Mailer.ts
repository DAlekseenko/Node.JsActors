import { createTransport } from 'nodemailer';
import config from '../config';
import { EmailMessage } from '../messaging/MessageContracts';
import { Actor } from './contracts/Actor';

const FROM = 'robot@proekt-xolod.ru';

class Mailer implements Actor {

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
    // @ts-ignore
    this.transport.close();
    console.log('Stop actor: Mailer');
  }
}

export default Mailer;
