import Payload from "./Payload";

export default class FloatPayload extends Payload {

  constructor(
    name: string,
    unit: string,
    public data: number,
  ) {
    super(name, unit);
  }

}
