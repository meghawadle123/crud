import { Injectable, OnInit } from "@angular/core";
import { Ireceipe } from "../models/receipe";
import { Observable, of, Subject } from "rxjs";
import { Ires } from "../models/todo";

@Injectable({
    providedIn:'root'
})
export class ReceipeService implements OnInit{
private  editSubObj$:Subject<Ireceipe>=new Subject<Ireceipe>();

editRecObs$:Observable<Ireceipe>=this.editSubObj$.asObservable();

emitReceipe(receipe:Ireceipe){
    this.editSubObj$.next(receipe);
}

 

recipesData :Array<Ireceipe>= [
  {
    id: "1",
    recipeName: "Paneer Butter Masala",
    category: "Dinner",
    price: 250,
    rating: 4.5,
    imgUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398"
  },
  {
    id: "2",
    recipeName: "Veg Biryani",
    category: "Lunch",
    price: 180,
    rating: 4.3,
    imgUrl: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a"
  },
  {
    id: "3",
    recipeName: "Masala Dosa",
    category: "Breakfast",
    price: 120,
    rating: 4.7,
    imgUrl: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976"
  }
];
    constructor(){}

    ngOnInit(): void {
        
    }

    fetchReceipe():Observable<Ireceipe[]>{
        return of(this.recipesData)
    }

    receipeAdd(receipe:Ireceipe):Observable<Ires<Ireceipe>>
    {
      this.recipesData.push(receipe);
      return of({
        msg:`The receipe Data with id ${receipe.id} is added succesfully`,
        data:receipe
      })
    }


 RemoveReceipe(id:string):Observable<Ires<Ireceipe>>{
 let getIndex=this.recipesData.findIndex(t=>t.id===id);  
     let receipe=this.recipesData.splice(getIndex,1);
        return of({
            msg:`the receipeItem with id ${id}is remoeved succesfully`,
            data:receipe[0]
        })
    }
    
onUpdate(receipe:Ireceipe):Observable<Ires<Ireceipe>>{
    let getindex=this.recipesData.findIndex(t=>t.id===receipe.id);
    this.recipesData[getindex]=receipe
   
    return of({
        msg:`the Receipe with ${receipe.id} is updated succesfully`,
        data:receipe
    })
}
}