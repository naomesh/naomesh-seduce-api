import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import Payload from "../Payload";
import { firstValueFrom } from "rxjs";
import PayloadData from "../PayloadData";
import * as process from "process";

@Injectable()
export class EnergyService {
  constructor(private readonly httpService: HttpService) {}
  async getProduction(): Promise<Payload> {
    /*
    let query = "SELECT mean(\"value\") FROM \"sensors\" WHERE (\"sensor\" = 'solar1_sol1_P_AC') AND time >= now() - 24h GROUP BY time(1m) fill(null);"
      +"SELECT mean(\"value\") FROM \"sensors\" WHERE (\"sensor\" = 'solar2_sol2_P_AC') AND time >= now() - 24h GROUP BY time(1m) fill(null);"
      +"SELECT mean(\"value\") FROM \"sensors\" WHERE (\"sensor\" = 'solar3_sol3_P_AC') AND time >= now() - 24h GROUP BY time(1m) fill(null);"
      +"SELECT mean(\"value\") FROM \"sensors\" WHERE (\"sensor\" = 'solar4_sol4_P_AC') AND time >= now() - 24h GROUP BY time(1m) fill(null);"
      +"SELECT mean(\"value\") FROM \"sensors\" WHERE (\"sensor\" = 'solar5_sol5_P_AC') AND time >= now() - 24h GROUP BY time(1m) fill(null);"
      +"SELECT mean(\"value\") FROM \"sensors\" WHERE (\"sensor\" = 'solar6_sol6_P_AC') AND time >= now() - 24h GROUP BY time(1m) fill(null);"
      +"SELECT mean(\"value\") FROM \"sensors\" WHERE (\"sensor\" = 'solar7_sol7_P_AC') AND time >= now() - 24h GROUP BY time(1m) fill(null);"
      +"SELECT mean(\"value\") FROM \"sensors\" WHERE (\"sensor\" = 'solar8_sol8_P_AC') AND time >= now() - 24h GROUP BY time(1m) fill(null);"
      +"SELECT mean(\"value\") FROM \"sensors\" WHERE (\"sensor\" = 'solar9_sol9_P_AC') AND time >= now() - 24h GROUP BY time(1m) fill(null);"
      +"SELECT mean(\"value\") FROM \"sensors\" WHERE (\"sensor\" = 'solar10_sol10_P_AC') AND time >= now() - 24h GROUP BY time(1m) fill(null);"
      +"SELECT mean(\"value\") FROM \"sensors\" WHERE (\"sensor\" = 'solar11_sol11_P_AC') AND time >= now() - 24h GROUP BY time(1m) fill(null);"
      +"SELECT mean(\"value\") FROM \"sensors\" WHERE (\"sensor\" = 'solar12_sol12_P_AC') AND time >= now() - 24h GROUP BY time(1m) fill(null);"
      +"SELECT mean(\"value\") FROM \"sensors\" WHERE (\"sensor\" = 'solar13_sol13_P_AC') AND time >= now() - 24h GROUP BY time(1m) fill(null);"
      +"SELECT mean(\"value\") FROM \"sensors\" WHERE (\"sensor\" = 'solar14_sol14_P_AC') AND time >= now() - 24h GROUP BY time(1m) fill(null);";
const {data} =  await firstValueFrom(this.httpService.get(process.env.SEDUCE_GRAFANA_BASE_URL +
      "&q=" + query))
     */

    let query = "https://hub.imt-atlantique.fr/seduce/grafana/api/datasources/proxy/1/query?db=mondb&q=SELECT%20mean(%22value%22)%20FROM%20%22sensors%22%20WHERE%20(%22sensor%22%20%3D%20%27solar1_sol1_P_AC%27)%20AND%20time%20%3E%3D%20now()%20-%201h%20GROUP%20BY%20time(2s)%20fill(null)%3BSELECT%20mean(%22value%22)%20FROM%20%22sensors%22%20WHERE%20(%22sensor%22%20%3D%20%27solar2_sol2_P_AC%27)%20AND%20time%20%3E%3D%20now()%20-%201h%20GROUP%20BY%20time(2s)%20fill(null)%3BSELECT%20mean(%22value%22)%20FROM%20%22sensors%22%20WHERE%20(%22sensor%22%20%3D%20%27solar3_sol3_P_AC%27)%20AND%20time%20%3E%3D%20now()%20-%201h%20GROUP%20BY%20time(2s)%20fill(null)%3BSELECT%20mean(%22value%22)%20FROM%20%22sensors%22%20WHERE%20(%22sensor%22%20%3D%20%27solar4_sol4_P_AC%27)%20AND%20time%20%3E%3D%20now()%20-%201h%20GROUP%20BY%20time(2s)%20fill(null)%3BSELECT%20mean(%22value%22)%20FROM%20%22sensors%22%20WHERE%20(%22sensor%22%20%3D%20%27solar5_sol5_P_AC%27)%20AND%20time%20%3E%3D%20now()%20-%201h%20GROUP%20BY%20time(2s)%20fill(null)%3BSELECT%20mean(%22value%22)%20FROM%20%22sensors%22%20WHERE%20(%22sensor%22%20%3D%20%27solar6_sol6_P_AC%27)%20AND%20time%20%3E%3D%20now()%20-%201h%20GROUP%20BY%20time(2s)%20fill(null)%3BSELECT%20mean(%22value%22)%20FROM%20%22sensors%22%20WHERE%20(%22sensor%22%20%3D%20%27solar7_sol7_P_AC%27)%20AND%20time%20%3E%3D%20now()%20-%201h%20GROUP%20BY%20time(2s)%20fill(null)%3BSELECT%20mean(%22value%22)%20FROM%20%22sensors%22%20WHERE%20(%22sensor%22%20%3D%20%27solar8_sol8_P_AC%27)%20AND%20time%20%3E%3D%20now()%20-%201h%20GROUP%20BY%20time(2s)%20fill(null)%3BSELECT%20mean(%22value%22)%20FROM%20%22sensors%22%20WHERE%20(%22sensor%22%20%3D%20%27solar9_sol9_P_AC%27)%20AND%20time%20%3E%3D%20now()%20-%201h%20GROUP%20BY%20time(2s)%20fill(null)%3BSELECT%20mean(%22value%22)%20FROM%20%22sensors%22%20WHERE%20(%22sensor%22%20%3D%20%27solar10_sol10_P_AC%27)%20AND%20time%20%3E%3D%20now()%20-%201h%20GROUP%20BY%20time(2s)%20fill(null)%3BSELECT%20mean(%22value%22)%20FROM%20%22sensors%22%20WHERE%20(%22sensor%22%20%3D%20%27solar11_sol11_P_AC%27)%20AND%20time%20%3E%3D%20now()%20-%201h%20GROUP%20BY%20time(2s)%20fill(null)%3BSELECT%20mean(%22value%22)%20FROM%20%22sensors%22%20WHERE%20(%22sensor%22%20%3D%20%27solar12_sol12_P_AC%27)%20AND%20time%20%3E%3D%20now()%20-%201h%20GROUP%20BY%20time(2s)%20fill(null)%3BSELECT%20mean(%22value%22)%20FROM%20%22sensors%22%20WHERE%20(%22sensor%22%20%3D%20%27solar13_sol13_P_AC%27)%20AND%20time%20%3E%3D%20now()%20-%201h%20GROUP%20BY%20time(2s)%20fill(null)%3BSELECT%20mean(%22value%22)%20FROM%20%22sensors%22%20WHERE%20(%22sensor%22%20%3D%20%27solar14_sol14_P_AC%27)%20AND%20time%20%3E%3D%20now()%20-%201h%20GROUP%20BY%20time(2s)%20fill(null)&epoch=ms"

    const {data} =  await firstValueFrom(this.httpService.get(process.env.REQUEST_PRODUCTION_GET_24H))

    return Payload.factory(data,"energy_24h_production","?");
  }

  async getTotalProduction(): Promise<Payload> {
    //get data from getProduction
    const payloadOfProduction : Payload = await this.getProduction();
    //sum up all values
    let sum: number = 0;
    let dataLength: number = payloadOfProduction.data.length;
    for (const payload of payloadOfProduction.data) {
      sum += payload.getSumOfData();
    }
    //return new Payload
    const payloadData = new PayloadData("total");
    payloadData.addData(sum,Date.now());
    return new Payload([payloadData],"energy_24h_total_production" ,payloadOfProduction.unit);
  }
}
