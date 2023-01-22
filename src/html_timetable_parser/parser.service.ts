import { Injectable } from '@nestjs/common';
import { request } from 'undici';
import { parse, HTMLElement } from 'node-html-parser';

@Injectable()
export class HtmlTimeTableService {
  async loadHtmlTimeTable(group: string, spec: string): Promise<HTMLElement> {
    try {
      const { statusCode, headers, trailers, body } = await request(
        `http://ruz.nsmu.ru/?group=${group}&spec=${spec}#metka`,
      );
      if (statusCode >= 200 && statusCode < 300) {
        const timetable = parse(await body.text()).querySelector(
          'body > div.container > div:nth-child(122) > div',
        );
        return timetable;
      }
      throw new Error(`status ${statusCode}`);
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
