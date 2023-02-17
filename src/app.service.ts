import { Injectable } from '@nestjs/common';
import GrafanaUrlBuilder from "./GrafanaUrlBuilder";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import FloatPayload from "./payload/FloatPayload";
import SumAndDataNumberPayload from "./payload/SumAndDataNumberPayload";

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
      let floatPayload = new FloatPayload(`Live consumption of nodes ${nodes[i]}`, "watt", values[0][1]);
      finalPayload.push(floatPayload);
    }

    return finalPayload;
  }

  async getLiveProductionSolarPanels(): Promise<FloatPayload> {
    const {data} =  await firstValueFrom(this.httpService.get(GrafanaUrlBuilder.liveProductionSolarPanels()))
    let results = data.results;
    let sum = 0;
    for (let i = 0; i < results.length; i++) {
      if(results[i].series.length != 1 || results[i].series[0].values.length != 1) {
        console.error("[getLiveProductionSolarPanels] Result series length does not match 1 - result: " + results[i].series.length + " values: " + results[i].series[0].values.length);
        continue;
      }
      let values = results[i].series[0].values;
      sum += values[0][1];
    }

    return new FloatPayload("Live production of solar panels", "watt", sum/(results.length));
  }

  async getConsumptionDiffNode(nodeID: string, from: number, step: number): Promise<any[]> {
    const {data} =  await firstValueFrom(this.httpService.get(GrafanaUrlBuilder.consumptionDiffNode(nodeID, from, step)))
    let results = data.results;
    if(results.length != 1) {
      throw new Error("[getConsumptionDiffNode] Results length does not match 1 - results: " + results.length);
    }
    let finalPayload = [];
    for(let i = 0; i < results.length; i++) {
      //sum all values
      let values = results[i].series[0].values;
      let sum = 0;
      for(let j = 0; j < values.length; j++) {
        sum += values[j][1];
      }
      finalPayload.push(new SumAndDataNumberPayload(`Consumption of node ${nodeID} from last ${from} hours`, "watt", values, sum));

    }
    return finalPayload;
  }

  async getConsumptionNode(nodeID: string, range: string, step: number): Promise<any[]> {
    //range is for example 1675782805000:1675782805000,1675782806000:1675782906000 transform to [[1675782805000,1675782805000],[1675782806000,1675782906000]]
    let ranges : Array<Array<string>> = range
      .split(",")
      .map((range) => range.split(":"));

    const {data} =  await firstValueFrom(this.httpService.get(GrafanaUrlBuilder.consumptionNode(nodeID, ranges, step)))


    return data.results;
  }

}
