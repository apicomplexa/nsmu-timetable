import { Module } from '@nestjs/common';
import { IcalModule } from './iCal/ical.module';
import { JsonTimetableModule } from './json_time_table/json_tt.module';

@Module({
  imports: [JsonTimetableModule, IcalModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
