import { Component, OnInit } from '@angular/core';
import { Istudent } from '../../models/student';
import { StudentService } from '../../service/student.service';
import { SnackbarService } from '../../service/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetconfirmComponent } from '../getconfirm/getconfirm.component';
import { config } from 'rxjs';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent implements OnInit {
StudentArr:Array<Istudent>=[];
  constructor(private _StudentService:StudentService,
    private _snackbar:SnackbarService,
    private _matDialog:MatDialog
  ) { }

  ngOnInit(): void {
   this.getStudent();
  }


  trackbyfun(index:number,student:Istudent){
    return student.stdid;
  }


  getStudent(){
    this._StudentService.fetchStudents().subscribe({
    next:data=>{
      this.StudentArr=data;
    },
    error:err=>{
      this._snackbar.opensnckabr(err)
    }
   })
  }


  OnRemove(id:string){
    let config=new MatDialogConfig();
    config.width='450px';
    config.disableClose=true;
    config.data=`Are u sure ?U want to remove the student ${id}`
    let getconfi= this._matDialog.open(GetconfirmComponent,config);
    getconfi.afterClosed().subscribe(res=>{
      if(res){
        this._StudentService.RemoveStd(id).subscribe({
          next:data=>{
            this._snackbar.opensnckabr(data.msg)
          },
          error:err=>{
            this._snackbar.opensnckabr(err);
          }
        })
      }
    })
  }



  onEdit(student:Istudent){
    this._StudentService.emitEditstd(student)
  }
}
