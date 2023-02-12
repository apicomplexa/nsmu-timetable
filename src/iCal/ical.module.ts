import { Module } from '@nestjs/common';
import { JsonTimetableModule } from 'src/json_time_table/json_tt.module';
import { JsonTimetableService } from 'src/json_time_table/json_tt.service';
import { IcalController } from './ical.controller';
import { IcalService } from './ical.service';

@Module({
  imports: [JsonTimetableModule],
  controllers: [IcalController],
  providers: [IcalService],
})
export class IcalModule {}
