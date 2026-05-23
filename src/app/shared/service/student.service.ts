import { Injectable } from '@angular/core';
import { Istudent } from '../models/student';
import { flush } from '@angular/core/testing';
import { Observable, of, Subject } from 'rxjs';
import { Ires } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
 studentsArr:Array<Istudent> = [
  {
    fname: "Megha",
    lname: "Wadle",
    email: "megha@gmail.com",
    contact: "9876543210",
    stdid: '101',
    isActive:true
  },
  {
    fname: "Rahul",
    lname: "Sharma",
    email: "rahul@gmail.com",
    contact: "9123456780",
    stdid: '102',
    isActive:false
  },
  {
    fname: "Priya",
    lname: "Patil",
    email: "priya@gmail.com",
    contact: "9988776655",
    stdid: '103',
    isActive:true
  }
];

private EditStuSub$:Subject<Istudent>=new Subject<Istudent>();//it is private we cant access it outside class

editStuObs$:Observable<Istudent>=this.EditStuSub$.asObservable()

emitEditstd(std:Istudent){
  this.EditStuSub$.next(std);
}
//fetchstudents
 constructor() { }

fetchStudents():Observable<Istudent[]>{
  return of(this.studentsArr)
}

AddStudent(student:Istudent):Observable<Ires<Istudent>>{
  this.studentsArr.push(student)
 return of( {
  msg:`The student with ${student.stdid} added succesfully !!!`,
  data:student
 })

}

RemoveStd(id:string):Observable<Ires<Istudent>>{

  let getIndex=this.studentsArr.findIndex(t=>t.stdid===id);
  let RemovedStd=this.studentsArr.splice(getIndex,1);
  return of({
    msg:'The student is removed sucessfully !!!',
    data:RemovedStd[0]
  })
}
 

updateStudent(UpdatedStd:Istudent):Observable<Ires<Istudent>>{
  let getindex=this.studentsArr.findIndex(t=>t.stdid===UpdatedStd.stdid);
  this.studentsArr[getindex]=UpdatedStd;
  return of({
    msg:`The Student with id ${UpdatedStd.stdid} is updated succesfuuly !!!!`,
    data:UpdatedStd
  })
}
}
