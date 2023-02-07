import { Controller, Get, Param } from '@nestjs/common';
import { Lesson } from './interface/lesson.interface';
import { JsonTimetableService } from './json_tt.service';
import { HtmlTimeTableService } from '../html_timetable_parser/parser.service';

//http://ruz.nsmu.ru/?group=%D0%9B%D0%941/00000000175&spec=%D0%9B%D0%B5%D1%87%D0%B5%D0%B1%D0%BD%D0%BE%D0%B5%20%D0%B4%D0%B5%D0%BB%D0%BE#metka
@Controller('json')
class JSONController {
  constructor(
    private htmlTimetableService: HtmlTimeTableService,
    private jsonTimetableService: JsonTimetableService,
  ) {}

  @Get(':curse/:grope/:spec')
  async parseHtmlTimeTable(
    @Param('curse') curse: string,
    @Param('grope') grope: string,
    @Param('spec') spec: string,
  ): Promise<Lesson[]> {
    const htmlTimetable = await this.htmlTimetableService.loadHtmlTimeTable(
      `${curse}/${grope}`,
      spec,
    );
    return htmlTimetable
      .map((weekTt) => this.jsonTimetableService.parseLessons(weekTt))
      .flat();
  }
}

export { JSONController };
