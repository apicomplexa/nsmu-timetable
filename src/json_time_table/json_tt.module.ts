import { Module } from '@nestjs/common';
import { JSONController } from './json_tt.controller';
import { JsonTimetableService } from './json_tt.service';
import { HtmlTimeTableService } from './parser.service';

@Module({
  controllers: [JSONController],
  providers: [JsonTimetableService, HtmlTimeTableService],
  exports: [JsonTimetableService],
})
export class JsonTimetableModule {}
