import { Injectable } from '@nestjs/common';
import { request } from 'undici';
import { parse, HTMLElement } from 'node-html-parser';

//http://ruz.nsmu.ru/?week=0&group=%D0%9B%D0%941/00000000178&spec=%D0%9B%D0%B5%D1%87%D0%B5%D0%B1%D0%BD%D0%BE%D0%B5%20%D0%B4%D0%B5%D0%BB%D0%BE#metka
@Injectable()
export class HtmlTimeTableService {
  private async loadHtmlTimeTable4Week(
    grope: string,
    spec: string,
    week: number,
  ): Promise<HTMLElement> {
    const { statusCode, headers, trailers, body } = await request(
      `http://ruz.nsmu.ru/?week=${week}&group=${grope}&spec=${spec}#metka`,
    );
    if (statusCode >= 200 && statusCode < 300) {
      const timetable = parse(await body.text()).querySelector(
        'body > div.container > div:nth-child(122) > div',
      );
      return timetable;
    }
    throw new Error(`status ${statusCode}`);
  }

  async loadHtmlTimeTable(
    grope: string,
    spec: string,
  ): Promise<{ week1: HTMLElement; week2: HTMLElement }> {
    return {
      week1: await this.loadHtmlTimeTable4Week(grope, spec, 0),
      week2: await this.loadHtmlTimeTable4Week(grope, spec, 1),
    };
  }
}
