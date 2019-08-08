import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  userDetails;
  Client_email;
  consult = { Expert_email:'',  day:'',dateActual:Date ,time:''};

  constructor(public userService: UserService, private toastr:ToastrService) { }

  ngOnInit() {

    
   
  
  };
}
  