import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import Payload from "../Payload";
import { firstValueFrom } from "rxjs";
import PayloadData from "../PayloadData";
import * as process from "process";

@Injectable()
export class EnergyService {
  constructor(private readonly httpService: HttpService) {}
  async getDifferentiatedProduction(): Promise<Payload> {
    const {data} =  await firstValueFrom(this.httpService.get(process.env.REQUEST_PRODUCTION_GET_24H))
    return Payload.factory(data,"energy_24h_production","?");
  }

  async getTotalProduction(): Promise<Payload> {
    //get data from getProduction
    const payloadOfProduction : Payload = await this.getDifferentiatedProduction();
    //sum up all values
    let sum: number = 0;
    for (const payload of payloadOfProduction.data) {
      sum += payload.getSumOfData();
    }
    //return new Payload
    const payloadData = new PayloadData("total");
    payloadData.addData(sum,Date.now());
    return new Payload([payloadData],"energy_24h_total_production" ,payloadOfProduction.unit);
  }
}
