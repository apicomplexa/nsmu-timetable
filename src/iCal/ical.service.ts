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
        )} ${lesson.title}`,
        location: lesson.location,
      });
    });
    return calendar.toString();
  }

  private chooseLessonLogoByType(
    lessonType: LessonType,
    isOnline: boolean,
  ): string {
    const onlineLogo = isOnline ? '๐' : '';
    switch (lessonType) {
      case LessonType.practice:
        return onlineLogo + '๐ะะ ';
      case LessonType.sem:
        return onlineLogo + '๐ะกะตะผ';
      case LessonType.lection:
        return onlineLogo + '๐๏ธะะตะบ';
      case LessonType.lab:
        return onlineLogo + '๐ฌะะ ';
      case LessonType.unknown:
        return onlineLogo + 'โ';
    }
  }
}

export { IcalService };
