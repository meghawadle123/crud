import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { Itodo } from '../../models/todo';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todoArr:Array<Itodo>=[]
  constructor(private _todoService:TodoService,
  private _snckabar:SnackbarService
  ) { }

  ngOnInit(): void {
   this.fetchAlltodo()
  }


  fetchAlltodo(){
      this._todoService.fetchAlltodos().subscribe({
      next:data=>{
          this.todoArr=data;
          
      },
      error:err=>{
       this._snckabar.opensnckabr(`error`)
      }
    });
    
  }
  onEdit(todo:Itodo){
    this._todoService.editTodosub$.next(todo)
  }



  onRemove(id:string){
    this._todoService.removeTodo(id).subscribe({
      next:data=>{
       this._snckabar.opensnckabr(data.msg)
      },
      error:err=>{
        this._snckabar.opensnckabr(err.msg)
      }
    })
  }
}
