import { Module } from '@nestjs/common';
import { HtmlTimeTableController } from './html_timetable_parser/parser.controller';
import { HtmlTimeTableService } from './html_timetable_parser/parser.service';

@Module({
  imports: [],
  controllers: [HtmlTimeTableController],
  providers: [HtmlTimeTableService],
})
export class AppModule {}
