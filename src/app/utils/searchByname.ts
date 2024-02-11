


export const searchByNameInDB = (
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
query: Record<string, any>,)=>{
    let search={}
  if(query.name){
     search = {name:{$regex: query.name,$options: 'i'}}
  }
  return search
}