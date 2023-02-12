import Payload from "./Payload";

export default class SumAndDataPayload extends Payload {

  constructor(
    name: string,
    unit: string,
    public data: number,
    public sum: number,
  ) {
    super(name, unit);
  }

}
