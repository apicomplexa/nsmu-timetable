import { Controller, Get } from '@nestjs/common';

@Controller('html-timetable')
export class HtmlTimeTableController {
  @Get()
  async parseHtmlTimeTable(): Promise<string> {
    return 'Test 123-321';
  }
}
