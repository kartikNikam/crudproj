import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataserviceService } from '../services/dataservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;
  constructor(private fb: FormBuilder,private dataService: DataserviceService,private router:Router) {
    this.angForm = this.fb.group({
 
      email: ['', [Validators.email]],
      password: ['', Validators.required]
 
    });
   }

  ngOnInit(): void {
  }
  postdata()
  {
    this.dataService.userlogin(this.angForm.value.email,this.angForm.value.password)
      .pipe()
      .subscribe(
          data => {
           
            if(data[0].result=="Login Successful")
            {
             
              this.router.navigate(['dashboard']);
            }
            else{
              alert("Unsuccessful")
            }
            
 
          },
          error => {
              alert("User name or password is incorrect")
          });
  }
  get f() { return this.angForm.controls; }
  get email() { return this.angForm.get('email'); }
  get password() { return this.angForm.get('password'); }
}


