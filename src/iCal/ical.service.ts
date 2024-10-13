import { Injectable } from '@nestjs/common';
import ical from 'ical-generator';
import ICalCalendar from 'ical-generator/dist/calendar';
import {
  Lesson,
  LessonType,
} from '../json_time_table/interface/lesson.interface';

@Injectable()
class IcalService {
  provideWholeTimeTable(lessons: Lesson[]) {
    const calendar = ical({ name: 'All lessons' });
    lessons.forEach((lesson) => {
      calendar.createEvent({
        start: lesson.startTime,
        end: lesson.endTime,
        summary: `${this.chooseLessonLogoByType(
          lesson.lessonType,
          lesson.isOnline,
        )} ${lesson.title} (${lesson.lessonType})`,
        location: lesson.location,
      });
    });
    return calendar.toString();
  }

  private chooseLessonLogoByType(
    lessonType: LessonType,
    isOnline: boolean,
  ): string {
    const onlineLogo = isOnline ? '🌐' : '';
    switch (lessonType) {
      case LessonType.practice:
        return onlineLogo + '📝ПР';
      case LessonType.sem:
        return onlineLogo + '💁СМ';
      case LessonType.lection:
        return onlineLogo + '🖍️ЛК';
      case LessonType.lab:
        return onlineLogo + '🔬ЛР';
      case LessonType.clin:
        return onlineLogo + '🥼КЛ';
      case LessonType.unknown:
        return onlineLogo + '❔';
    }
  }
}

export { IcalService };
