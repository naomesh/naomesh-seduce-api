import { Controller, Get, Query, Version } from "@nestjs/common";
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
              private readonly appService: AppService
  ) {}

  @Get("live-consumption")
  @Version('1')
  async getLiveConsumption(@Query("nodes") nodes): Promise<any[]> {
    return await this.appService.getLiveConsumption(nodes.split(","));
  }


}
