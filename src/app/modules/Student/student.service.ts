/* eslint-disable prefer-const */
import { sendEmail } from '../../utils/sendEmail';
import Admission from '../AdmissionRequest/admissionRequest.model';
import Department from '../Department/department.model';
import User from '../User/user.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TStudent } from './student.interface';
import Student from './student.model';

type TDenyStudent = {
  id: string;
  email: string;
  text: string;
};

const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};

const creatingStudentWIthIdIntoDB = async (payload: TStudent) => {
  const admissionRequest = await Admission.findById(
    payload?.admissionRequestId,
  );
  if (!admissionRequest) {
    throw new Error('Admission Request not found');
  }

  const semesterRegistration = await SemesterRegistration.findById(
    admissionRequest.semester,
  );

  if (!semesterRegistration) {
    throw new Error('semesterRegistration not found');
  }

  const academicSemester = await AcademicSemester.findById(
    semesterRegistration?.academicSemester,
  );

  if (!academicSemester) {
    throw new Error('academicSemester not found');
  }

  const departmentCode = await Department.findById(
    admissionRequest.department,
    { code: 1, _id: 0 },
  );
  const lastTwoDigitsOfYear =
    Number(admissionRequest?.yearOfRegistration) % 100;
  const lastStudent = await Student.find({}, { studentId: 1, _id: 0 })
    .sort({ studentId: -1 })
    .limit(1);
  const lastStudentId = lastStudent[0]?.studentId || '000-000-000';
  let currentId = '000';
  let currentStudentYear = lastTwoDigitsOfYear.toString();
  let lastStudentYear = lastStudentId?.substring(0, 2);

  let currentSemesterCode = academicSemester?.code.substring(1);

  let lastStudentSemesterCode = lastStudentId?.substring(2, 3);
  let currentDeptCode = departmentCode!.code;
  let lastStudentDeptCode = lastStudentId?.substring(4, 7);
  if (
    lastStudentYear === currentStudentYear &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentDeptCode === currentDeptCode
  ) {
    currentId = lastStudentId.substring(8);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(3, '0');
  let finalId =
    currentStudentYear +
    currentSemesterCode +
    '-' +
    currentDeptCode +
    '-' +
    incrementId;
  payload.studentId = finalId;
  const result = await Student.create(payload);

  if (result) {
    const id = result.admissionRequestId;
    const userId = admissionRequest.userId;
    await Admission.findByIdAndUpdate(id, { isApproved: true });
    await User.findByIdAndUpdate(userId, { role: 'student' });
    sendEmail(
      admissionRequest.email,
      'Your Admission Requested Approved',
      `Congratulations! Your Admission Requested at Metropolitan University has been approved. Your Student Id is ${result.studentId}`,
    );
  }
  return result;
};

const denyStudent = async (payload: TDenyStudent) => {
  const subject = `Admission for Metropolitan University`;
  const res = await sendEmail(payload.email, subject, payload.text);
  let result;
  if (res.accepted.length > 0) {
    result = await Admission.findByIdAndDelete(payload.id);
  }
  return result;
};

export const studentService = {
  getAllStudentFromDB,
  creatingStudentWIthIdIntoDB,
  denyStudent,
};
