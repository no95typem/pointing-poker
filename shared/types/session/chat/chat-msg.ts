export class ChatMsg {
  constructor(private text$: string, readonly id: number) {}

  get text(): string {
    return this.text$;
  }

  // ?
  // edit()
}
