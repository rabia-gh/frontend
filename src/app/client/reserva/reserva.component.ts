import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

 
  sub;
  id : number;
data=[];
data2;
info=[];
color1=[];
color0=[];
color2=[];
reserved2=[];
reserved3=[];
noreserved=[];
noreserved2=[];
noreserved3=[];
duration_heures;
duration_minutes;
  value_end: any;
  value_start: any;
  cases;
  times=[];
  times2=[];
  times3=[];
  case2='';
  userDetails;
  email;
  er="NaN";
  constructor(private route :ActivatedRoute , private userService: UserService, private router : Router, private toastr:ToastrService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
    this.id = params['_id'];
    console.log(this.id);

    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.email=this.userDetails.email;      
        console.log(this.email);
      },
      err => { 
        console.log(err);
        
      }
    );







    this.userService.expertDetails(this.id).subscribe(
      response => {
        console.log(response) ;
            //this.data=response;
            this.data[2]= response["Expert_name"];
            this.data[1]= response["email"];
            this.data[4]= response["dispo_Info"]["dispo_day"];
            this.data[6]= response["dispo_Info"]["heure_dep"];
            this.data[7]= response["dispo_Info"]["heure_ter"];
            this.data[10]=response["_id"];
            this.value_start=this.data[6].split(':'); 
            this.value_end=this.data[7].split(':');
            this.duration_heures=(this.value_end[0]-this.value_start[0])*60;
            this.duration_minutes=this.value_end[1]-this.value_start[1];
            this.cases= Math.abs((this.duration_heures+this.duration_minutes)/30);
            console.log(this.cases);
            this.times[0]=Number(this.value_start[0]*60)+Number(this.value_start[1]);
            this.times2[0]=Number(this.value_start[0]*60)+Number(this.value_start[1]);
            console.log(this.times[0]);
                for (let i = 0; i < this.cases-1; i++) {
                  this.times[i+1]=this.times[i]+30;
                  this.times2[i+1]=this.times2[i]+30;
                 // console.log(this.times[i+1]);
                  //console.log(this.times2[i+1]);
                }
                for (let i = 0; i <= this.cases-1; i++) {
                  this.times2[i]=Math.trunc(this.times2[i]/60)
                 // console.log(this.times[i+1]);
                  console.log(this.times2[i]);
                }
                for (let i = 0; i <= this.cases-1; i++) {
                  this.times3[i]=this.times2[i]+':'+this.times[i]%60;
                 // console.log(this.times[i+1]);
                  //console.log(this.times3[i]);
                }

                console.log(this.times);
                //console.log(this.times2);
                console.log(this.times3);
                this.userService.getcolor(this.data[2],this.data[4]).subscribe(
                  response => {

                    this.data2=response;
                    console.log(response) ;
                    for (let i = 0; i < this.data2.length; i++) {
                      this.info[i]=this.data2[i]['consult_Info']['time'];
                    } 
                    console.log(this.info)   ;


                    for (let i = 0; i < this.data2.length; i++) {
                      this.color1[i]=this.info[i].split(':')[1];
                      this.color0[i]=this.info[i].split(':')[0];
                    } 
                    for (let i = 0; i < this.data2.length; i++) {
                      this.color2[i]=Number(this.color0[i]*60)+Number(this.color1[i]);
                    } 
                    console.log(this.color2);

                    for (let i =0 ;i<=this.times.length;i++){
                      for (let j=0;j<=this.color2.length;j++){
                        if (this.times[i]===this.color2[j]){break;}
                        if (j==this.color2.length){ this.noreserved[i]=this.times[i];}
                      }
                      continue;
                      
                    }
                    console.log( this.noreserved);


                    for (let i = 0; i <= this.noreserved.length-1; i++) {
                      this.noreserved2[i]=Math.trunc(this.noreserved[i]/60)
                     // console.log(this.times[i+1]);
                     // console.log(this.noreserved2[i]);
                    }
                    //console.log(this.noreserved2);
                    for (let i = 0; i <= this.noreserved.length-1; i++) {
                      this.noreserved3[i]=this.noreserved2[i]+':'+this.noreserved[i]%60;
                     // console.log(this.times[i+1]);
                      //console.log(this.times3[i]);
                    }
                    console.log(this.noreserved3)





                    for (let i = 0; i <= this.color2.length-1; i++) {
                      this.reserved2[i]=Math.trunc(this.color2[i]/60)
                     // console.log(this.times[i+1]);
                     // console.log(this.noreserved2[i]);
                    }
                    //console.log(this.reserved2);
                    for (let i = 0; i <= this.color2.length-1; i++) {
                      this.reserved3[i]=this.reserved2[i]+':'+this.color2[i]%60;
                     // console.log(this.times[i+1]);
                      //console.log(this.times3[i]);
                    }
                    console.log(this.reserved3);




                  }    
                );
            
      }    
     );
  })

}
reserve(cas){
  this.userService.reserve(this.data[1],this.data[4],cas,this.email).subscribe(
    res => {
      this.toastr.success('Saved' , 'Success!');
      console.log(cas);
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
;
}
