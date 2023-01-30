import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { WeatherService } from './weather/weather.service';
import { WeatherModule } from './weather/weather.module';
import { HttpModule } from "@nestjs/axios";
import { EnergyModule } from './energy/energy.module';

@Module({
  imports: [ConfigModule.forRoot(), WeatherModule, HttpModule, EnergyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
