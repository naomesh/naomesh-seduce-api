import { Controller, Get, Query, Version } from "@nestjs/common";
import { AppService } from './app.service';
import FloatPayload from "./payload/FloatPayload";

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

  @Get("live-production-solar-panels")
  @Version('1')
  async getLiveProductionSolarPanels(): Promise<FloatPayload> {
    return await this.appService.getLiveProductionSolarPanels();
  }


}
