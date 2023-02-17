import Payload from './Payload';

export default class SumAndDataPayload extends Payload {
  constructor(
    name: string,
    unit: string,
    public data: Array<Data>,
    public sum: number,
  ) {
    super(name, unit);
  }
}

export class Data {
  constructor(
    public start: number,
    public end: number,
    public data: Array<Array<number>>,
  ) {}
}
