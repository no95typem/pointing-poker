// senderMsgId нужен для сопоставления сообщения до и после регистрации этого сообщения на сервере
// в качестве key в реакте предлагаю использовать key объекта (*ChatMsg) в session.chat.msgs
// в этом объекте в качестве ключей исользовать serverMsgId (это будет номер [0, Integer.MAX_INTEGER]),
// таким образом почти всегда будет использоваться serverMsgId за исключением моментов
// пока сообщение незарегестрировано на сервере
// senderMsgId предлагаю получать через Date.now()
// т.к. это во первых его будет всегда держать последним в списке,
// а во вторых вероятность что пользователь сможет создать 2 action в 1 ms => 0

export interface UnregisteredChatMsg {
  readonly text: string;
  readonly senderMsgId: string;
}

export interface RegisteredChatMsg extends UnregisteredChatMsg {
  readonly memberId: number;
  readonly time: number; // Date.now()
  readonly serverMsgId: number;
}
