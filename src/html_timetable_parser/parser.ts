import { parse } from 'node-html-parser';
import { ICalEventData } from 'ical-generator';

type Event = Required<
  Pick<ICalEventData, 'start' | 'end' | 'summary' | 'description' | 'timezone'>
>;

function fromStringToDate(time: string, date: string): Date {
  const d_m_y = date.split('-');
  const date_sec = `${d_m_y[1]}-${d_m_y[0]}-${d_m_y[2]} ${time}`;
  return new Date(Date.parse(date_sec));
}

class Parser {
  getHtmlTimetable(page_html: string) {
    const root_html = parse(page_html);
    return root_html.querySelectorAll(
      'body > div.container > div:nth-child(122) > div > div:nth-child(1) > div:nth-child(7)',
    );
  }
}

const parser = new Parser();
export default parser;
