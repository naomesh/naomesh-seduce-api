import { Injectable } from '@nestjs/common';
import GrafanaUrlBuilder from './GrafanaUrlBuilder';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import FloatPayload from './payload/FloatPayload';
import SumAndDataNumberPayload from './payload/SumAndDataNumberPayload';
import SumAndDataPayload, { Data } from './payload/SumAndDataPayload';
import DataPayload from "./payload/DataPayload";

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getLiveConsumption(nodes: string[]): Promise<any[]> {
    const { data } = await firstValueFrom(
      this.httpService.get(GrafanaUrlBuilder.liveConsumption(nodes)),
    );
    const results = data.results;

    if (results.length != nodes.length) {
      throw new Error(
        '[getLiveConsumption] Results length does not match nodes length - results: ' +
          results.length +
          ' nodes: ' +
          nodes.length,
      );
    }

    const finalPayload = [];
    for (let i = 0; i < results.length; i++) {
      if (
        results[i].series.length != 1 ||
        results[i].series[0].values.length != 1
      ) {
        console.error(
          '[getLiveConsumption] Result series length does not match 1 - result: ' +
            results[i].series.length +
            ' values: ' +
            results[i].series[0].values.length,
        );
        continue;
      }
      const values = results[i].series[0].values;
      const floatPayload = new FloatPayload(
        `Live consumption of nodes ${nodes[i]}`,
        'watt',
        values[0][1],
      );
      finalPayload.push(floatPayload);
    }

    return finalPayload;
  }

  async getLiveProductionSolarPanels(): Promise<FloatPayload> {
    const { data } = await firstValueFrom(
      this.httpService.get(GrafanaUrlBuilder.liveProductionSolarPanels()),
    );
    const results = data.results;
    let sum = 0;
    for (let i = 0; i < results.length; i++) {
      if (
        results[i].series.length != 1 ||
        results[i].series[0].values.length != 1
      ) {
        console.error(
          '[getLiveProductionSolarPanels] Result series length does not match 1 - result: ' +
            results[i].series.length +
            ' values: ' +
            results[i].series[0].values.length,
        );
        continue;
      }
      const values = results[i].series[0].values;
      sum += values[0][1];
    }

    return new FloatPayload(
      'Live production of solar panels',
      'watt',
      sum / results.length,
    );
  }

  async getConsumptionDiffNode(
    nodeID: string,
    from: number,
    step: number,
  ): Promise<any[]> {
    const { data } = await firstValueFrom(
      this.httpService.get(
        GrafanaUrlBuilder.consumptionDiffNode(nodeID, from, step),
      ),
    );
    const results = data.results;
    if (results.length != 1) {
      throw new Error(
        '[getConsumptionDiffNode] Results length does not match 1 - results: ' +
          results.length,
      );
    }
    const finalPayload = [];
    for (const element of results) {
      //sum all values
      const values = element.series[0].values;
      let sum = 0;
      for (let j = 0; j < values.length; j++) {
        sum += values[j][1];
      }
      finalPayload.push(
        new SumAndDataNumberPayload(
          `Consumption of node ${nodeID} from last ${from} hours`,
          'watt',
          values,
          sum,
        ),
      );
    }
    return finalPayload;
  }

  async getConsumptionNode(
    nodeID: string,
    range: string,
    step: number,
  ): Promise<SumAndDataPayload> {
    //range is for example 1675782805000:1675782805000,1675782806000:1675782906000 transform to [[1675782805000,1675782805000],[1675782806000,1675782906000]]
    const ranges: Array<Array<number>> = range
      .split(',')
      .map((range) => range.split(':').map((time) => parseInt(time)));

    const { data } = await firstValueFrom(
      this.httpService.get(
        GrafanaUrlBuilder.consumptionNode(nodeID, ranges, step),
      ),
    );

    const dataPayload: Array<Data> = [];
    for (let i = 0; i < data.results.length; i++) {
      const values = data.results[i].series[0].values;
      dataPayload.push(new Data(ranges[i][0], ranges[i][1], values));
    }

    let sum = 0;
    for (let i = 0; i < dataPayload.length; i++) {
      for (let j = 0; j < dataPayload[i].data.length; j++) {
        sum += dataPayload[i].data[j][1];
      }
    }
    return new SumAndDataPayload(
      `Consumption of node ${nodeID}`,
      'watt',
      dataPayload,
      sum,
    );
  }

  async getProductionSolarPanels(
    from: number): Promise<DataPayload> {
    const { data } = await firstValueFrom(
      this.httpService.get(
        GrafanaUrlBuilder.productionSolarPanels(from),
      ),
    );

    //return a DataPayload
    const rawData = [];
    for (let i = 0; i < data.results.length; i++) {
      rawData.push(data.results[i].series[0].values);
    }

    return new DataPayload(
      `Production of solar panels from last ${from} hours`,
      'watt',
      rawData
    );

  }
}
