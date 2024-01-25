# Description

> Server code on Nest.js parsing lessons timetable from NSMU [site](http://ruz.nsmu.ru) and converting its to iCalendar format for automatic import to other calendars (like Google Calendar)

⚠️ It's __unofficial__ project! I doesn't receive any support form NSMU so there is potential ban rick (cause i parse there html site without permission)

# Usage

1. Copy link to your timetable from official [site](http://ruz.nsmu.ru)

```
http://ruz.nsmu.ru/?group=%D0%9B%D0%941/00000000163&spec=%D0%9B%D0%B5%D1%87%D0%B5%D0%B1%D0%BD%D0%BE%D0%B5%20%D0%B4%D0%B5%D0%BB%D0%BE#metka

```

2. Find course code, group code and spec:

```
                    |----course---|   |---group---|        |--spec--...
ruz.nsmu.ru/?group=  %D0%9B%D0%941  /  00000000163  &spec=  %D0%9B%D...
```

3. Compose link using template below

```
https://HERE_WILL_BE_ROOT_DOMAIN_AFTER_DEPLOY/ical/all/course/group/spec
```

4. Past this link to your calendar 
    
    - [Google Calendar](https://support.google.com/calendar/answer/37100?hl=en&co=GENIE.Platform%3DDesktop#:~:text=Use%20a%20link%20to%20add%20a%20public%20calendar) [[RUS](https://support.google.com/calendar/answer/37100?hl=ru&co=GENIE.Platform%3DDesktop#:~:text=%D0%9A%D0%B0%D0%BA%20%D0%BF%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C%D1%81%D1%8F%20%D0%BD%D0%B0%20%D0%BE%D0%B1%D1%89%D0%B5%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%BD%D1%8B%D0%B9%20%D0%BA%D0%B0%D0%BB%D0%B5%D0%BD%D0%B4%D0%B0%D1%80%D1%8C%20%D0%BF%D0%BE%20%D1%81%D1%81%D1%8B%D0%BB%D0%BA%D0%B5)]
    - [Apple Calendar](https://support.apple.com/guide/calendar/subscribe-to-calendars-icl1022/11.0/mac/13.0) [[RUS](https://support.apple.com/ru-ru/guide/calendar/icl1022/11.0/mac/13.0)]
    - Other calendars should have same functionality try to google


# Plans

- [ ] Test server
- [ ] Telegram bot or web app for autoconverting links 

# JSON Api

JSON Get Api is provided by this server on subdomain `https://ROOT_DOMAIN/json/curse/grope/spec`

```typescript
interface Lesson {
  startTime: Date;
  endTime: Date;
  title: string;
  auditory: string;
  location: string;
  lessonType: LessonType;
  isOnline: boolean;
}
enum LessonType {
  practice = 'Practice',
  sem = 'Seminar',
  lection = 'Lection',
  lab = 'Laboratory work',
  unknown = 'Unknown',
}
```
