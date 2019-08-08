import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  userDetails: any;
  day;
  data;
  name:'';
  Search:'';
  domaine:'';
  constructor(public userService:UserService, private router:Router, private toastr:ToastrService,private _sharedService: SharedService) { }
  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        console.log(this.userDetails);
      },
      err => { 
        console.log(err);
      }
    );


  }
search(){
  if (this.domaine){
    this.userService.getExpertByDomaine(this.Search).subscribe(
      response=> {console.log(response);
      this.data=response;
      console.log(this.domaine);
      }, 
      err=>{
        console.log(err);
      }
      
    )
  
  }
if(this.name){
          this.userService.getExpertByName(this.Search).subscribe(
            response=> {console.log(response);
            this.data=response;
            console.log(this.name);
            }, 
            err=>{
              console.log(err);
            }
            
          )

}

}
gotopage(info){
  this._sharedService.data1 = info
  this.router.navigate(['/select']);
}


}
