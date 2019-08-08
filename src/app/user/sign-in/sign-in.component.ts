import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(public userService: UserService,private router : Router) { }
  model ={
    email :'',
    password :'',
    client:'',
    expert:''

  };
  client:'';
  expert:'';


  emailRegex =/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  serverErrorMessages: string;

  ngOnInit() {
    if(this.userService.isLoggedIn())
    this.router.navigateByUrl('/login');
  }
  onSubmit(form : NgForm){
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        if (this.client){
          this.router.navigateByUrl('/clientprofile');
        }
        else if (this.expert){
          this.router.navigateByUrl('/expertprofile');
        }

     },
      err => {
        this.serverErrorMessages = err.error.message;

      }
    );
  }

}
