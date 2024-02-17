
export const searchByIdInDB = (
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
query: Record<string, any>,)=>{
    let search={}
  if(query.studentId){
     search = {studentId:{$regex: query.studentId,$options: 'i'}}
  }
  return search
}
