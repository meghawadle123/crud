import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ireceipe } from '../../models/receipe';
import { ReceipeService } from '../../service/receipe.service';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-receipe-form',
  templateUrl: './receipe-form.component.html',
  styleUrls: ['./receipe-form.component.scss']
})
export class ReceipeFormComponent implements OnInit {

  @ViewChild('receipeForm') receipeForm!: NgForm;

  IsinEditMode: boolean = false;

  EditObj!:Ireceipe

  constructor(
    private _receipeService: ReceipeService,
    private _snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.onEdit();
  }

  onAddSubmit() {

    if (this.receipeForm.valid) {

      let receipeObj: Ireceipe = {
        ...this.receipeForm.value,
        id: Date.now().toString()
      }
      this._receipeService.receipeAdd(receipeObj).subscribe({
        next: data => {
          this._snackbar.opensnckabr(data.msg);
          this.receipeForm.reset();
        },

        error: err => {
          this._snackbar.opensnckabr(err.msg);
        }
      })
    }
  }

  onEdit(){
    this._receipeService.editRecObs$.subscribe(receipe=>{
      
      this.IsinEditMode=true;
      this.EditObj=receipe;
      this.receipeForm.form.patchValue(receipe);
    })
  }

  onUpdate(){
    if(this.receipeForm.valid){
    let Updated_obj:Ireceipe={
      ...this.receipeForm.value,
      id:this.EditObj.id
    }
    
    this._receipeService.onUpdate(Updated_obj).subscribe({
      next:data=>{
        this.IsinEditMode=false;
    this.receipeForm.reset();
        this._snackbar.opensnckabr(data.msg);
      },
      error:err=>{
        this._snackbar.opensnckabr(err);
      }
    })
  }
}
}

 