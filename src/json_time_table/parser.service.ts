import { Injectable } from '@nestjs/common';
import { parse, HTMLElement } from 'node-html-parser';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

//http://ruz.nsmu.ru/?week=0&group=%D0%9B%D0%941/00000000178&spec=%D0%9B%D0%B5%D1%87%D0%B5%D0%B1%D0%BD%D0%BE%D0%B5%20%D0%B4%D0%B5%D0%BB%D0%BE#metka
@Injectable()
export class HtmlTimeTableService {
  constructor(private readonly httpService: HttpService) {}

  private async loadHtmlTimeTable4Week(
    grope: string,
    spec: string,
    week: number,
  ): Promise<HTMLElement> {
    const { status, data } = await firstValueFrom(
      this.httpService.get(
        `http://ruz.nsmu.ru/?week=${week}&group=${grope}&spec=${spec}`,
      ),
    );
    if (status >= 200 && status < 300) {
      const timetable = parse(await data);
      return timetable;
    }
    throw new Error(`status ${status}`);
  }

  async loadHtmlTimeTable(grope: string, spec: string): Promise<HTMLElement[]> {
    return [
      await this.loadHtmlTimeTable4Week(grope, spec, 0),
      await this.loadHtmlTimeTable4Week(grope, spec, 1),
    ];
  }
}
