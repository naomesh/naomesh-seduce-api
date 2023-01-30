import { Module } from '@nestjs/common';
import { EnergyController } from './energy.controller';
import { EnergyService } from './energy.service';
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  exports: [EnergyService],
  controllers: [EnergyController],
  providers: [EnergyService]
})
export class EnergyModule {}
