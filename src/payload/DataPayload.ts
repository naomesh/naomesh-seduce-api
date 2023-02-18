import Payload from "./Payload";

export default class DataPayload extends Payload {
  constructor(
    name: string,
    unit: string,
    public data: Array<Array<number>>
  ) {
    super(name, unit);
  }
}
