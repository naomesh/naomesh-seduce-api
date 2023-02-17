import Payload from "./Payload";

export default class SumAndDataNumberPayload extends Payload {

  constructor(
    name: string,
    unit: string,
    public data: number,
    public sum: number,
  ) {
    super(name, unit);
  }

}
