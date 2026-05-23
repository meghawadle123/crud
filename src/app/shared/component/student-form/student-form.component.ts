import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../../service/student.service';
import { Istudent } from '../../models/student';
import { SnackbarService } from '../../service/snackbar.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {


  @ViewChild('stdForm')stdForm!:NgForm
  isinEditMode:boolean=false;

  editStd!:Istudent
  constructor(private _studentService:StudentService,
    private _snackbar:SnackbarService
  ) { }

  ngOnInit(): void {
   this.onEdit();
  }

  onStudentAdd(){
    if(this.stdForm.valid){
      let stdObj:Istudent={
        ...this.stdForm.value,
        stdid:Date.now().toString()
      }
      this.stdForm.reset();
      this._studentService.AddStudent(stdObj).subscribe({
        next:data=>{
           this._snackbar.opensnckabr(data.msg)
        },
        error:err=>{
          this._snackbar.opensnckabr(err.msg)
        }
      })
    }
  }

  onEdit(){
    this._studentService.editStuObs$.subscribe(std=>{
      this.isinEditMode=true;
      this.editStd=std;
      this.stdForm.form.patchValue(std);
    })
  }


  onUpdate(){
    if(this.stdForm.valid){
    let updated_obj:Istudent={
      ...this.stdForm.value,
      stdid:this.editStd.stdid
    }
    this._studentService.updateStudent(updated_obj).subscribe({
      next:data=>{
        this._snackbar.opensnckabr(data.msg);
        this.stdForm.reset();
        this.isinEditMode=false;
      },
      error:err=>{
        this._snackbar.opensnckabr(err.error);
      }
    })
  }
  }
}
