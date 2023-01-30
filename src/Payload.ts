import PayloadData from "./PayloadData";

export default class Payload {

  constructor(
    public data: PayloadData[],
    public name: string,
    public unit: string,
  ) {}

  static factory = (payload: any,name:string,unit) : Payload => {
    let results : Array<PayloadData> =   [];;
   const seriesLength = payload.results.length;

   for (let index = 0; index < seriesLength; index++) {
     for (const serie of payload.results[index].series) {
       let payloadData = new PayloadData(serie.name);
       for (const value of serie.values) {
         payloadData.addData(value[1], value[0]);
       }
        results.push(payloadData);
     }
   }
    return new Payload(results,name,unit);


  }

}
