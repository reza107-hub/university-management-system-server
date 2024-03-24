import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './OfferedCourse.interface';
import Program from '../Program/program.model';
import Department from '../Department/department.model';
import { Course } from '../Course/course.model';
import Faculty from '../Faculty/faculty.model';
import { OfferedCourse } from './OfferedCourse.model';
import { hasTimeConflict } from './OfferedCourse.utils';
import QueryBuilder from '../../builder/QueryBuilder';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistrationId,
    programId,
    departmentId,
    courseId,
    sectionId,
    facultyId,
    routine,
  } = payload;

  const isSemesterRegistrationExits = await SemesterRegistration.findById(
    semesterRegistrationId,
  );

  if (!isSemesterRegistrationExits) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester registration not found !',
    );
  }

  const academicSemesterId = isSemesterRegistrationExits.academicSemester;

  const isProgramExits = await Program.findById(programId);

  if (!isProgramExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Program not found !');
  }

  const isAcademicDepartmentExits = await Department.findById(departmentId);

  if (!isAcademicDepartmentExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found !');
  }

  const isCourseExits = await Course.findById(courseId);

  if (!isCourseExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found !');
  }

  const isFacultyExits = await Faculty.findById(facultyId);

  if (!isFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }


  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistrationId,
      courseId,
      sectionId,
    });

  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course with same section is already exist!`,
    );
  }

  const assignedSchedules = await OfferedCourse.find({
    semesterRegistrationId,
    facultyId,
    'routine.days': { $in: routine?.map((r) => r.days) },
  }).select('routine.days routine.startTime routine.endTime -_id');


  const newSchedule = routine?.map(({ days, startTime, endTime }) => ({
    days,
    startTime,
    endTime,
  }));
  if (assignedSchedules.length > 0 && hasTimeConflict(assignedSchedules[0]?.routine, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`,
    );
  }

  const result = await OfferedCourse.create({
    ...payload,
    academicSemesterId,
  });
  return result;
};

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await offeredCourseQuery.modelQuery;
  return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const offeredCourse = await OfferedCourse.findById(id);

  if (!offeredCourse) {
    throw new AppError(404, 'Offered Course not found');
  }

  return offeredCourse;
};

const getCoursesForSingleFaculty = async (facultyId: string) => {
  const offeredCourse = await OfferedCourse.find({ facultyId })
    .populate('academicSemesterId')
    .populate('sectionId')
    .populate('courseId');
  if (!offeredCourse) {
    throw new AppError(404, 'Offered Course not found');
  }
  return offeredCourse;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Partial<TOfferedCourse>,
) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the faculty exists
   * Step 3: check if the semester registration status is upcoming
   * Step 4: check if the faculty is available at that time. If not then throw error
   * Step 5: update the offered course
   */
  const { facultyId, routine, semesterRegistrationId } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found !');
  }

  const isFacultyExists = await Faculty.findById(facultyId);

  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistrationId;
  // get the schedules of the faculties

  // Checking the status of the semester registration
  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`,
    );
  }

  // check if the faculty is available at that time.
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistrationId,
    facultyId,
    'routine.days': { $in: routine?.map((r) => r.days) },
  }).select('routine.days routine.startTime routine.endTime -_id');

  const newSchedule = routine?.map(({ days, startTime, endTime }) => ({
    days,
    startTime,
    endTime,
  }));
  // console.log({ newSchedule, assigned: assignedSchedules[0].routine });
  if (hasTimeConflict(assignedSchedules[0].routine, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`,
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteOfferedCourseFromDB = async (id: string) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the semester registration status is upcoming
   * Step 3: delete the offered course
   */
  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found');
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistrationId;

  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration).select('status');

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course can not update ! because the semester ${semesterRegistrationStatus}`,
    );
  }

  const result = await OfferedCourse.findByIdAndDelete(id);

  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  deleteOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
  getCoursesForSingleFaculty,
};
