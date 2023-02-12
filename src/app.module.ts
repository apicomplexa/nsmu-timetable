import { Module } from '@nestjs/common';
import { HtmlTimeTableController } from './html_timetable_parser/parser.controller';
import { JSONController } from './json_time_table/json_tt.controller';
import { IcalController } from './iCal/ical.controller';
import { HtmlTimeTableService } from './html_timetable_parser/parser.service';
import { JsonTimetableService } from './json_time_table/json_tt.service';
import { IcalService } from './iCal/ical.service';

@Module({
  imports: [],
  controllers: [JSONController, IcalController],
  providers: [HtmlTimeTableService, JsonTimetableService, IcalService],
})
export class AppModule {}
