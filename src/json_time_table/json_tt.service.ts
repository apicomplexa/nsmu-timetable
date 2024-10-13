import { Injectable } from '@nestjs/common';
import { HTMLElement } from 'node-html-parser';
import { HtmlTimeTableService } from 'src/json_time_table/parser.service';
import { Lesson, LessonType } from './interface/lesson.interface';

@Injectable()
class JsonTimetableService {
  constructor(private htmlTimetableService: HtmlTimeTableService) {}

  async JSON_Lessons(
    course: string,
    grope: string,
    spec: string,
  ): Promise<Lesson[]> {
    const htmlTimetable = await this.htmlTimetableService.loadHtmlTimeTable(
      `${course}/${grope}`,
      spec,
    );
    return htmlTimetable.map((weekTt) => this.parseLessons(weekTt)).flat();
  }

  private parseLessons(weekHTML: HTMLElement): Lesson[] {
    const selectorWithDivPosition = (position: number) => {
      return `body > div.container > div:nth-child(${position}) >.row > div > div`;
    };
    let lessonsContainers = [];
    let divPosition = 120;
    while (lessonsContainers.length === 0 && divPosition <= 130) {
      lessonsContainers = weekHTML.querySelectorAll(
        selectorWithDivPosition(divPosition),
      );
      divPosition += 1;
    }
    if (divPosition > 130) {
      const today = new Date();
      const startTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDay(),
        9,
        0,
      );
      const endTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDay(),
        9,
        0,
      );
      return [
        {
          startTime: startTime,
          endTime: endTime,
          title: 'Сайт СГМУ опять сломался',
          lessonType: LessonType.unknown,
          auditory: '',
          location: '',
          isOnline: false,
        },
      ];
    }

    return lessonsContainers.map((dayHTML) => {
      const { startDateTime, endDateTime } = this.parseDateTime(dayHTML);
      const { lessonType, title } = this.parseTitleAndType(dayHTML);

      const address = this.cleanLabelFromSpaces(
        dayHTML.childNodes[6].innerText,
      ).replace('Уч. ауд. №', 'Aуд №');

      const auditory = address.match(/&nbsp;(Moodle|\d*)/m)[1];
      const isOnline = auditory === 'Moodle';

      return {
        startTime: startDateTime,
        endTime: endDateTime,
        title: title,
        lessonType: lessonType,
        auditory: auditory,
        location: address.replace('&nbsp;', ''),
        isOnline: isOnline,
      };
    });
  }

  private parseTitleAndType(dayHTML: HTMLElement): {
    lessonType: LessonType;
    title: string;
  } {
    const [lessonTypeStr, title] = dayHTML.childNodes[3].text.split(': ');
    const lessonType = this.defineLessonType(lessonTypeStr);
    return { lessonType: lessonType, title: this.cleanLabelFromSpaces(title) };
  }

  private parseDateTime(dayHTML: HTMLElement): {
    startDateTime: Date;
    endDateTime: Date;
  } {
    const { startTime, endTime } = this.parseTime(dayHTML);
    const { day, monthIndex, year } = this.parseDate(dayHTML);

    return {
      startDateTime: new Date(
        year,
        monthIndex,
        day,
        startTime.h,
        startTime.min,
      ),
      endDateTime: new Date(year, monthIndex, day, endTime.h, endTime.min),
    };
  }

  private parseTime(dayHTML: HTMLElement): {
    startTime: { h: number; min: number };
    endTime: { h: number; min: number };
  } {
    const [startTime, endTime] = dayHTML.childNodes[1].childNodes[1].innerText
      .split('-')
      .map((t) => t.split(':').map((_) => Number(_)))
      .map((t) => [t[0] - 3, t[1]]); // `-3` тк. часовой пояс

    return {
      startTime: { h: startTime[0], min: startTime[1] },
      endTime: { h: endTime[0], min: endTime[1] },
    };
  }

  private parseDate(dayHTML: HTMLElement): {
    day: number;
    monthIndex: number;
    year: number;
  } {
    const [day, month, year] = dayHTML.childNodes[1].childNodes[2].innerText
      .split('-')
      .map((_) => Number(_));

    return {
      day: day,
      monthIndex: month - 1,
      year: year,
    };
  }

  private defineLessonType(lessonTypeStr: string) {
    switch (lessonTypeStr) {
      case 'Лекция':
        return LessonType.lection;
      case 'Практические занятия':
        return LessonType.practice;
      case 'Лабораторное занятие':
        return LessonType.lab;
      case 'Семинар':
        return LessonType.sem;
      case 'Клинические практические занятия':
        return LessonType.clin;
      default:
        return LessonType.unknown;
    }
  }

  private cleanLabelFromSpaces(lable: string): string {
    return lable
      .replace(/  /g, '')
      .replace(/\r/g, '')
      .replace(/\n/g, '')
      .replace(/\t/g, '');
  }
}

export { JsonTimetableService };
