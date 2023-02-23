import { Controller, Get, Param, Query, Version } from '@nestjs/common';
import { AppService } from './app.service';
import FloatPayload from './payload/FloatPayload';
import SumAndDataPayload from './payload/SumAndDataPayload';
import DataPayload from './payload/DataPayload';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('live-consumption')
  @Version('1')
  async getLiveConsumption(@Query('nodes') nodes: string): Promise<any[]> {
    return await this.appService.getLiveConsumption(nodes.split(','));
  }

  @Get('live-production-solar-panels')
  @Version('1')
  async getLiveProductionSolarPanels(): Promise<FloatPayload> {
    return await this.appService.getLiveProductionSolarPanels();
  }

  @Get('production-solar-panels')
  @Version('1')
  async getProductionSolarPanels(
    @Query('from') from = 24,
  ): Promise<DataPayload> {
    return await this.appService.getProductionSolarPanels(from);
  }

  @Get(':nodeID/live-consumption')
  @Version('1')
  async getLiveConsumptionNode(@Param('nodeID') nodeID): Promise<any[]> {
    return (await this.appService.getLiveConsumption([nodeID]))[0];
  }

  @Get(':nodeID/consumption-diff')
  @Version('1')
  async getConsumptionDiffNode(
    @Param('nodeID') nodeID,
    @Query('from') from = 2,
    @Query('step') step = 500,
  ): Promise<any[]> {
    return await this.appService.getConsumptionDiffNode(nodeID, from, step);
  }

  @Get(':nodeID/consumption')
  @Version('1')
  async getConsumptionNode(
    @Param('nodeID') nodeID,
    @Query('range') range,
    @Query('step') step = 500,
  ): Promise<SumAndDataPayload> {
    return await this.appService.getConsumptionNode(nodeID, range, step);
  }
}
