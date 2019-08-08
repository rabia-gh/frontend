import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
data1;
data;
  constructor(public userService:UserService,private _sharedService: SharedService) { }

  ngOnInit() {
    this.data1 = this._sharedService.data1;
    console.log(this.data1);
    this.userService.getExpert(this.data1).subscribe(
      response=> {console.log(response);
      this.data=response;
      console.log(this.data);
      }, 
      err=>{
        console.log(err);
      }
      
    )



  }

}
