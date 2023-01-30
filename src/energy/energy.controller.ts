import { Controller, Get } from "@nestjs/common";
import { EnergyService } from "./energy.service";
import Payload from "../Payload";
import { AxiosResponse } from "axios";

@Controller('energy')
export class EnergyController {
  constructor(private readonly energyService: EnergyService) {}


  @Get("/production")
  async getProduction(): Promise<Payload> {
    return await this.energyService.getProduction();
  }

  @Get("/production/total")
  async getProductionTotal(): Promise<Payload> {
    return await this.energyService.getTotalProduction();
  }
}
