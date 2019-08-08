import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  userDetails : any;
  data;

  constructor(public userService:UserService, private router:Router) { }

  ngOnInit() {this.userService.getUserProfile().subscribe(
    res => {
      this.userDetails = res['user'];
      console.log(this.userDetails.email);
      this.userService.getresev(this.userDetails.email).subscribe(
        response => {console.log(response) ;
          this.data=response;
          //this.searchedConsult[0]= response[0]["Expert_email"];
          //this.searchedConsult[1]= response["Expert_email"];
          //this.searchedConsult[2]= response["consult_Info"]["time"];
          //this.searchedConsult[3]= response["dateActual"];
          //this.searchedConsult[4]= response["consult_Info"]["day"];
        
        }    
       );

    },
    err => { 
      console.log(err);
      
    }

    
  );
  }
  
}
  
/*ngOnInit() {

    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.email=this.userDetails.email;
        this.domaine=this.userDetails.domaine;

        console.log(this.email);
        console.log(this.domaine);

        console.log(this.userDetails.email);
      },
      err => { 
        console.log(err);
        
      }
    );
  
  }

  save(){
    this.userService.regInfo(this.expert,this.email,this.domaine).subscribe(
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

}*/

