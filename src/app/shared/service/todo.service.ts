import { Injectable } from "@angular/core";
import { Itodo, ITodoRes } from "../models/todo";
import { Observable, of, Subject } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class TodoService{

editTodosub$:Subject<Itodo>=new Subject<Itodo>()
TodoArr:Array<Itodo>=[
    {
        todoItem:"js",
        todoId:"123"
    },
    {
        todoItem:"Angular",
        todoId:"124"
    },
    {
        todoItem:"Ts",
        todoId:"125"
    }
];

//fetch all todo methos
fetchAlltodos():Observable<Itodo[]>{
    return of(this.TodoArr)
}

//add todo 
createTodo(todo:Itodo):Observable<ITodoRes>{
    this.TodoArr.push(todo);
    let res={
        msg:`new todo item with id ${todo.todoId} is added succesfully`,
        data:todo
    }
    return of(res)
}

//edit


//update
updateTodo(todo:Itodo):Observable<ITodoRes>{
   let getindex=this.TodoArr.findIndex(t=>t.todoId===todo.todoId);
   this.TodoArr[getindex]=todo;
   return of({
    msg:`the Todo item with id ${todo.todoId} is updated succesfully`,
    data:todo
   })
}


//remove
// remove todo
removeTodo(id: string): Observable<ITodoRes> {

   let getIndex = this.TodoArr.findIndex(todo => todo.todoId === id);

   let removedTodo = this.TodoArr.splice(getIndex, 1);

   return of({
      msg: `The Todo item with id ${id} is removed successfully`,
      data: removedTodo[0]
   })
}

}