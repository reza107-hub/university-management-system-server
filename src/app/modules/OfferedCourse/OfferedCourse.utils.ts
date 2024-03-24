import { TSchedule } from './OfferedCourse.interface';

export const hasTimeConflict = (
  assignedSchedules: TSchedule[],
  newSchedule: TSchedule[] | undefined,
) => {
  // console.log({ newSchedule, assigned: assignedSchedules });

  for (const existingSchedule of assignedSchedules) {
    if(newSchedule){
      for (const newScheduleItem of newSchedule) {
        // Check if the schedules are on the same days
        if (
          existingSchedule.days.includes(newScheduleItem.days) ||
          newScheduleItem.days.includes(existingSchedule.days)
        ) {
          const existingStartTime = new Date(
            `1970-01-01T${existingSchedule.startTime}`,
          );
          const existingEndTime = new Date(
            `1970-01-01T${existingSchedule.endTime}`,
          );
          const newStartTime = new Date(
            `1970-01-01T${newScheduleItem.startTime}`,
          );
          const newEndTime = new Date(`1970-01-01T${newScheduleItem.endTime}`);

          // Check for overlap in schedules
          if (
            newStartTime < existingEndTime &&
            newEndTime > existingStartTime
          ) {
            return true; // Time conflict
          }
        }
      }
    }
  }

  return false; // No time conflict
};
