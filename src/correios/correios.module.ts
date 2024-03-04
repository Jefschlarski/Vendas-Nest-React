import { Module } from '@nestjs/common';
import { CorreiosService } from './correios.service';
import { CorreiosController } from './correios.controller';
import { HttpModule } from '@nestjs/axios';
import { CityModule } from 'src/city/city.module';
import { StateModule } from 'src/state/state.module';

@Module({
  imports: [HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  }), CityModule, StateModule],
  providers: [CorreiosService],
  controllers: [CorreiosController]
})
export class CorreiosModule {}
