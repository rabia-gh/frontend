import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/shared/user.service';
import {ToastrService} from 'ngx-toastr';
import { NgbDatepickerDayView } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import {MatDialog,MatDialogConfig} from "@angular/material" 
import { EditExpertComponent } from '../edit-expert/edit-expert.component';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  model: NgbDateStruct;
  userDetails;
  data;
  data1=[];
  data2=[];
  data3=[];
  data4=[];
  email;
  domaine;
  name;
  expert = { heure_dep:'', heure_ter:'', dateActual:Date ,dispo_day:''};
 
  constructor(private calendar: NgbCalendar,public userService: UserService, private toastr:ToastrService, private dialog:MatDialog) { }

  ngOnInit() {

    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.email=this.userDetails.email;
        this.domaine=this.userDetails.domaine;
        this.name=this.userDetails.firstName;
        console.log(this.name);
        console.log(this.email);
        console.log(this.domaine);

        console.log(this.userDetails.email);
        this.userService.daydetails(this.userDetails.email).subscribe(
          response => {
            console.log(response) ;
            this.data=response;
              for (let j=0 ; j<this.data.length ;j++)
               { 
                 this.data1[j]=this.data[j]['dispo_Info']['dispo_day'];
                 this.data2[j]=this.data[j]['dispo_Info']['heure_dep'];
                 this.data3[j]=this.data[j]['dispo_Info']['heure_ter'];
                 this.data4[j]=this.data[j]['_id'];

              }
              console.log(this.data1);

                
          })
      },
      err => { 
        console.log(err);
        
      }
    );


   



  
  }

  save(){
    this.userService.regInfo(this.expert,this.email,this.domaine,this.name).subscribe(
      res => {
        this.toastr.success('Saved' , 'Success!');

      },
      err => {//error due to validation
        if (err.status == 422 ) {
          this.toastr.error('Faled' , 'Enable!');
          
        }
        else
        this.toastr.warning('Faled' , 'Something went wrong!');
      }
    );
  }
  delete(date){
    this.userService.delete(this.email,date).subscribe(
      res => {
        this.toastr.success('deleted' , 'Success!');

      },
      err => {//error due to validation
        if (err.status == 422 ) {
          this.toastr.error('Faled' , 'Enable!');
          
        }
        else
        console.log(err);
        this.toastr.warning('Faled' , 'Something went wrong!');
      }
    );


  }

  edit(date){
    const dialogConfig =new MatDialogConfig;
    dialogConfig.disableClose=true; 
    dialogConfig.autoFocus=true ;
    dialogConfig.width="50%" ; 

  
  }

}
