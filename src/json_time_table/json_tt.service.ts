import { Injectable } from '@nestjs/common';
import { HTMLElement, Node } from 'node-html-parser';
import { Lesson, LessonType } from './interface/lesson.interface';

@Injectable()
class JsonTimetableService {
  parseLessons(weekHTML: HTMLElement): Lesson[] {
    return weekHTML
      .querySelectorAll(
        'body > div.container > div:nth-child(122) >.row > div > div',
      )
      .map((dayHTML) => {
        const [startTime, endTime] =
          dayHTML.childNodes[1].childNodes[1].innerText
            .split('-')
            .map((t) => t.split(':').map((_) => Number(_)));
        const [day, month, year] = dayHTML.childNodes[1].childNodes[2].innerText
          .split('-')
          .map((_) => Number(_));
        const [lessonTypeStr, title] = dayHTML.childNodes[3].text.split(': ');
        const lessonType: LessonType = this.defineLessonType(lessonTypeStr);
        const address = dayHTML.childNodes[6].innerText;
        const auditory = address.match(/&nbsp;(Moodle1|\d*)/m)[1];
        const isOnline = auditory === 'Moodle1';
        return {
          startTime: new Date(year, month, day, startTime[0], startTime[1]),
          endTime: new Date(year, month, day, endTime[0], endTime[1]),
          title: title,
          lessonType: lessonType,
          auditory: auditory,
          location: address.replace('&nbsp;', ''),
          isOnline: isOnline,
        };
      });
  }

  private defineLessonType(lessonTypeStr: string) {
    let lessonType: LessonType;
    switch (lessonTypeStr) {
      case 'Лекция':
        return LessonType.lection;
      case 'Практические занятия':
        return LessonType.practice;
      case 'Лабораторное занятие':
        return LessonType.lab;
      case 'Семинар':
        return LessonType.sem;
      default:
        return LessonType.unknown;
    }
  }
}

export { JsonTimetableService };
