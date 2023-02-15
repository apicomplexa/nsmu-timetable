import { Controller, Get, Param } from '@nestjs/common';
import { HtmlTimeTableService } from 'src/json_time_table/parser.service';
import { JsonTimetableService } from 'src/json_time_table/json_tt.service';
import { IcalService } from './ical.service';

//http://ruz.nsmu.ru/?group=%D0%9B%D0%941/00000000175&spec=%D0%9B%D0%B5%D1%87%D0%B5%D0%B1%D0%BD%D0%BE%D0%B5%20%D0%B4%D0%B5%D0%BB%D0%BE#metka
@Controller('ical')
class IcalController {
  constructor(
    private jsonTimetableService: JsonTimetableService,
    private icalService: IcalService,
  ) {}

  @Get('all/:course/:grope/:spec/')
  async allLessonsTimetable(
    @Param('course') course: string,
    @Param('grope') grope: string,
    @Param('spec') spec: string,
  ): Promise<string> {
    const jsonTt = await this.jsonTimetableService.JSON_Lessons(
      course,
      grope,
      spec,
    );
    return this.icalService.provideWholeTimeTable(jsonTt);
  }
}

export { IcalController };
