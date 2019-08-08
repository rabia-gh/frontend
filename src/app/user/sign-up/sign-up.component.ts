import { Component, OnInit } from '@angular/core';
import { UserService} from '../../shared/user.service'
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  
})
export class SignUpComponent implements OnInit {
  emailRegex =/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  showSuccessMessage: boolean;
  serverErrorMessages: string;

  constructor(public userService: UserService) { }

  ngOnInit() {
  }
  onSubmit(form : NgForm){
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false,4000);
        this.resetForm(form);
      },
      err => {//error due to validation
        if (err.status == 422 ) {
          this.serverErrorMessages = err.error.join('<br/>');
          
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin';


      }
    );

  }
  //once registration is succeded we will rest fields to their initial values
  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role:'',
      domaine:''
      
    };
    form.resetForm();
    this.serverErrorMessages = '' ;
  }

}
