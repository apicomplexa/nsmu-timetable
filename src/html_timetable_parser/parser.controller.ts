import { Controller, Get, Param } from '@nestjs/common';
import { HtmlTimeTableService } from './parser.service';

//http://ruz.nsmu.ru/?group=%D0%9B%D0%941/00000000175&spec=%D0%9B%D0%B5%D1%87%D0%B5%D0%B1%D0%BD%D0%BE%D0%B5%20%D0%B4%D0%B5%D0%BB%D0%BE#metka
@Controller('html-timetable')
export class HtmlTimeTableController {
  constructor(private htmlTimetableService: HtmlTimeTableService) {}

  @Get(':curse/:grope/:spec')
  async parseHtmlTimeTable(
    @Param('curse') curse: string,
    @Param('grope') grope: string,
    @Param('spec') spec: string,
  ): Promise<any> {
    const a = await this.htmlTimetableService.loadHtmlTimeTable(
      `${curse}/${grope}`,
      spec,
    );
    return `${a.firstChild.rawText}${a.childNodes[1].rawText}`;
  }
}
