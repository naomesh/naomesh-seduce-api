import { Injectable } from '@nestjs/common';
import GrafanaUrlBuilder from "./GrafanaUrlBuilder";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import FloatPayload from "./payload/FloatPayload";

@Injectable()
export class AppService {

  constructor(private readonly httpService: HttpService) {}

  async getLiveConsumption(nodes: string[]): Promise<any[]> {
    const {data} =  await firstValueFrom(this.httpService.get(GrafanaUrlBuilder.liveConsumption(nodes)))
    let results = data.results;

    if(results.length != nodes.length) {
      throw new Error("[getLiveConsumption] Results length does not match nodes length - results: " + results.length + " nodes: " + nodes.length);
    }

    let finalPayload = [];
    for(let i = 0; i < results.length; i++) {
      if(results[i].series.length != 1 || results[i].series[0].values.length != 1) {
        console.error("[getLiveConsumption] Result series length does not match 1 - result: " + results[i].series.length + " values: " + results[i].series[0].values.length);
        continue;
      }
      let values = results[i].series[0].values;
      let floatPayload = new FloatPayload(nodes[i], "watt", values[0][1]);
      finalPayload.push(floatPayload);
    }

    return finalPayload;
  }
}
