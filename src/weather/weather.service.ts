import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import Payload from "../Payload";
import { firstValueFrom } from "rxjs";

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  async getTemperature(): Promise<Payload> {
    var query = "SELECT mean(\"value\") FROM \"sensors\" " +
      "WHERE (\"sensor\" = 'weather_weather_temp') AND time >= now() - 2d GROUP "+
      "BY time(10m), \"sensor\" fill(null)";

    const { data } =  await firstValueFrom(this.httpService.get(process.env.SEDUCE_GRAFANA_BASE_URL +
        "&q=" + query)
      .pipe());

    return Payload.factory(data,"weather_temp","°C");
  }
}
