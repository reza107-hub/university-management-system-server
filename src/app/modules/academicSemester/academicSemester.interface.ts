export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAcademicSemesterName = 'Spring' | 'Summer' | 'Autumn';
export type TAcademicSemesterCode = '01' | '02' | '03';

export type TAcademicSemester = {
  name: TAcademicSemesterName;
  code: TAcademicSemesterCode;
  startMonth: TMonths;
  endMonth: TMonths;
};

export type TAcademicSemesterNameCodeMapper = {
  [key: string]: string;
};
