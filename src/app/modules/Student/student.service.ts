/* eslint-disable prefer-const */
import Admission from "../AdmissionRequest/adminRequest.model";
import { TStudent } from "./student.interface";
import Student from "./student.model";


const getAllStudentFromDB = async () => {
    const result = await Student.find();
    return result;
}

const creatingStudentWIthIdIntoDB = async (details:TStudent) => {

    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const lastTwoDigitsOfYear = (Number(details?.yearOfRegistration) % 100);

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const department = details?.department;

    const lastStudent = await Student
      .find({}, { studentId: 1, _id: 0 })
      .sort({ studentId: -1 })
      .limit(1);

    const lastStudentId = lastStudent[0]?.studentId || '000-000-000';

    let currentId = '000';
    let currentStudentYear = lastTwoDigitsOfYear.toString();
    let lastStudentYear = lastStudentId?.substring(0, 2);
    let currentSemesterCode = (currentMonth == 12 || currentMonth == 1 || currentMonth == 2) ? '1' : '2';
    let lastStudentSemesterCode = lastStudentId?.substring(2, 3);
    let currentDeptCode = (details?.department === 'CSE') ? '115' : '116';
    let lastStudentDeptCode = lastStudentId?.substring(4, 7);

    if (
      lastStudentYear === currentStudentYear &&
      lastStudentSemesterCode === currentSemesterCode &&
      lastStudentDeptCode === currentDeptCode
    ) {
      currentId = lastStudentId.substring(8);
    }

    let incrementId = (Number(currentId) + 1).toString().padStart(3, '0');
    let finalId = currentStudentYear + currentSemesterCode + '-' + currentDeptCode + '-' + incrementId;

    details.studentId = finalId;

    const result = await Student.create(details);

    if (result._id) {
      await Admission.findByIdAndDelete(details?._id);
    }

    return result;
}


export const studentService = {
    getAllStudentFromDB,
    creatingStudentWIthIdIntoDB
}