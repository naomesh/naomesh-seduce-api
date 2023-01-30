export default class PayloadData {
  public data: Data[] = [];
  constructor(
    public readonly name:string
  ) {}

  addData(value: number, time: number) {
    this.data.push(new Data(value, time));
  }

  getSumOfData() {
    return this.data.reduce((a, b) => a + b.value, 0);
  }


}

class Data {
  constructor(
    public readonly value: number,
    public readonly time: number,
  ) {}
}
