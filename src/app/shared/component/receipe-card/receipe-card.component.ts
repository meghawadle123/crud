import { Component, OnInit } from '@angular/core';
import { Ireceipe } from '../../models/receipe';
import { ReceipeService } from '../../service/receipe.service';
import { SnackbarService } from '../../service/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetconfirmComponent } from '../getconfirm/getconfirm.component';

@Component({
  selector: 'app-receipe-card',
  templateUrl: './receipe-card.component.html',
  styleUrls: ['./receipe-card.component.scss']
})
export class ReceipeCardComponent implements OnInit {
ReceipeArr:Array<Ireceipe>=[];

constructor(private _receipeservice:ReceipeService,
    private _snackbar:SnackbarService,
    private _matdialog:MatDialog
  ) { }

  ngOnInit(): void {
   this.fetchReceipe();
  }

  fetchReceipe(){
    this._receipeservice.fetchReceipe().subscribe({
      next:data=>{
        this.ReceipeArr=data;
      },
      error:err=>{
        this._snackbar.opensnckabr(err)
      }
    })
  }

  onRemove(id:string){
    let config=new MatDialogConfig();
    config.width='450px';
    config.disableClose=true;
    config.data=`are you sre You want to remove it with id ${id}`
    let getconfirm= this._matdialog.open(GetconfirmComponent,config)
    getconfirm.afterClosed().subscribe(res=>{
     if(res){
        this._receipeservice.RemoveReceipe(id).subscribe({
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

  onEdit(receipe:Ireceipe){
    this._receipeservice.emitReceipe(receipe);
  }

}
