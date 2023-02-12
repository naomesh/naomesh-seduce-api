import Payload from "./Payload";

export default class FloatPayload extends Payload {
  public data: number;

  constructor(
    name: string,
    unit: string,
    public value: number,
  ) {
    super(name, unit);
    this.data = value;
  }

}
