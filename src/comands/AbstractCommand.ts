import { CommandMessage } from '../messaging/MessageContracts';

export default class AbstractCommand<S, M = CommandMessage> {

  constructor(
        protected system: S,
        protected message: M
  ) {
  }
}
