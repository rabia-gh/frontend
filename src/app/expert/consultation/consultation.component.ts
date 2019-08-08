import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {
  userDetails;
  consultDetails;
  searchedConsult=[];
  data;
  constructor(public userService: UserService) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        console.log(this.userDetails.email);
        this.userService.consult(this.userDetails.email).subscribe(
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
