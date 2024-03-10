/* eslint-disable prefer-const */

import { searchByIdInDB } from '../../utils/searchByIdInDB';
import { sendEmail } from '../../utils/sendEmail';
import { TAdmissionWithWaiver } from '../AdmissionRequest/admissionRequest.interface';
import Admission from '../AdmissionRequest/admissionRequest.model';
import Department from '../Department/department.model';
import User from '../User/user.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import Batch, { SectionModel } from '../batch/batch.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TStudent } from './student.interface';
import Student from './student.model';

type TDenyStudent = {
  id: string;
  email: string;
  text: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllStudentFromDB = async (query: Record<string, any>) => {
  const students = Student.find();
  const search = searchByIdInDB(query);
  const result = await students
    .find(search)
    .populate({
      path: 'admissionRequestId',
      populate: {
        path: 'department',
        model: 'department',
      },
    })
    .populate({
      path: 'admissionRequestId',
      populate: {
        path: 'semester',
        model: 'SemesterRegistration',
        populate: {
          path: 'academicSemester',
          model: 'AcademicSemester',
        },
      },
    });

  return result;
};

const creatingStudentWIthIdIntoDB = async (payload: TStudent) => {
  const admissionRequest = await Admission.findById(
    payload?.admissionRequestId,
  );
  if (!admissionRequest) {
    throw new Error('Admission Request not found');
  }

  const batch = await Batch.findById(admissionRequest?.batch?._id);

  const section = await SectionModel.find({ batchId: batch?._id })
    .sort({ createdAt: -1 }) // -1 for descending order
    .limit(1);

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
    const lastStudent = await Student.find({studentId: new RegExp(`-${departmentCode?.code}-`)}).sort({ studentId: -1 }).select('studentId -_id').limit(1);

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
    if (section[0].student_ids.length === section[0].capacity) {
      let nextAlphabet = section[0].name.split(' ')[1]; // Extract existing alphabet
      if (!nextAlphabet) {
        const updatedSection = await SectionModel.findByIdAndUpdate(
          section[0]._id,
          {
            name: `${batch?.batchNumber} A`,
          },
        );
        if (updatedSection?.isModified) {
          nextAlphabet = 'A';
          nextAlphabet = String.fromCharCode(nextAlphabet.charCodeAt(0) + 1);
        }
      } else {
        nextAlphabet = String.fromCharCode(nextAlphabet.charCodeAt(0) + 1); // Increment alphabet
      }

      // Update the current section with the new name

      // Create a new section with the next alphabet in the name
      const data = {
        batchId: batch?._id,
        name: `${batch?.batchNumber} ${nextAlphabet}`,
      };
      const newSection = await SectionModel.create(data);

      // Push the student ID to the new section
      await SectionModel.findByIdAndUpdate(newSection?._id, {
        $push: { student_ids: result.studentId },
      });
    } else {
      // If the current section is not full, just push the student ID to the existing section
      await SectionModel.findByIdAndUpdate(section[0]._id, {
        $push: { student_ids: result.studentId },
      });
    }

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
const creatingStudentManuallyWIthIdIntoDB = async (payload: TAdmissionWithWaiver) => {

  const { waiver, ...restPayload } = payload
  // console.log(payload) 

  const admissionRequest = await Admission.create(restPayload);

  const batch = await Batch.findById(admissionRequest?.batch?._id);

  const section = await SectionModel.find({ batchId: batch?._id })
    .sort({ createdAt: -1 }) // -1 for descending order
    .limit(1);

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

  const lastStudent = await Student.find({studentId: new RegExp(`-${departmentCode?.code}-`)}).sort({ studentId: -1 }).select('studentId -_id').limit(1);
  // console.log(lastStudent)
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
  // payload.studentId = finalId;
  const studentData = {
    admissionRequestId: admissionRequest._id,
    studentId: finalId,
    waiver: waiver
  }
  const result = await Student.create(studentData);

  if (result) {
    const id = result.admissionRequestId;
    const userId = admissionRequest.userId;
    if (section[0].student_ids.length === section[0].capacity) {
      let nextAlphabet = section[0].name.split(' ')[1]; // Extract existing alphabet
      if (!nextAlphabet) {
        const updatedSection = await SectionModel.findByIdAndUpdate(
          section[0]._id,
          {
            name: `${batch?.batchNumber} A`,
          },
        );
        if (updatedSection?.isModified) {
          nextAlphabet = 'A';
          nextAlphabet = String.fromCharCode(nextAlphabet.charCodeAt(0) + 1);
        }
      } else {
        nextAlphabet = String.fromCharCode(nextAlphabet.charCodeAt(0) + 1); // Increment alphabet
      }

      // Update the current section with the new name

      // Create a new section with the next alphabet in the name
      const data = {
        batchId: batch?._id,
        name: `${batch?.batchNumber} ${nextAlphabet}`,
      };
      const newSection = await SectionModel.create(data);

      // Push the student ID to the new section
      await SectionModel.findByIdAndUpdate(newSection?._id, {
        $push: { student_ids: result.studentId },
      });
    } else {
      // If the current section is not full, just push the student ID to the existing section
      await SectionModel.findByIdAndUpdate(section[0]._id, {
        $push: { student_ids: result.studentId },
      });
    }

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
  creatingStudentManuallyWIthIdIntoDB
};
