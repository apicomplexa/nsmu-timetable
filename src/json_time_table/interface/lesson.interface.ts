enum LessonType {
  practice = 'Practice',
  sem = 'Seminar',
  lection = 'Lection',
  lab = 'Laboratory work',
  unknown = 'Unknown',
}

interface Lesson {
  startTime: Date;
  endTime: Date;
  title: string;
  auditory: string;
  location: string;
  lessonType: LessonType;
  isOnline: boolean;
}

export type { Lesson };
export { LessonType };
