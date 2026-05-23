import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Itodo } from '../../models/todo';
import { TodoService } from '../../service/todo.service';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  isinEditMode:boolean=false;
@ViewChild('todoForm')todoForm!:NgForm // we want this in two time thats why we used here element ref we didnt passed parameyer in that todoadd() function
 editTodo!:Itodo 

constructor(private _todoservice:TodoService,
    private _snackbar:SnackbarService
  ) { }

  ngOnInit(): void {
   this.onEdit();
  }

  onTodoAdd(){
     if(this.todoForm.valid){
      let obj:Itodo={...this.todoForm.value,todoId:Date.now()};
      this.todoForm.reset();
      this._todoservice.createTodo(obj).subscribe({
        next:data=>{
          this._snackbar.opensnckabr(data.msg)
        },
        error:err=>{
          this._snackbar.opensnckabr(err);
        }
      })
     }
  }


onEdit(){
  this._todoservice.editTodosub$.subscribe({
    next:data=>{
      this.editTodo=data
      this.isinEditMode=true;
      this.todoForm.form.patchValue(data);
    },
    error:err=>{
      console.log(err);
    }
   })
}



onUpdate(){
  if(this.todoForm.valid){
     let updated_obj:Itodo={
      ...this.todoForm.value,
      todoId:this.editTodo.todoId
    }
   this.isinEditMode=false;
   this.todoForm.reset();
  //api call
  this._todoservice.updateTodo(updated_obj).subscribe({
    next:data=>{
      this._snackbar.opensnckabr(data.msg)
    },
    error:err=>{
      this._snackbar.opensnckabr(err.msg)
    }
  })
  }
}
}
