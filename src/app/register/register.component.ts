import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataserviceService } from '../services/dataservice.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  angForm: FormGroup;
  constructor(private fb: FormBuilder,private dataService: DataserviceService,private router:Router) {
 
    this.angForm = this.fb.group({
      name: ['', Validators.required,Validators.minLength(4)],
      email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
      password: ['', Validators.required],
        });
        this.angForm=new FormGroup({
          name: new FormControl(),
          email: new FormControl(),
          password: new FormControl()               
        });
       }
  ngOnInit(): void {
  }
  postdata()
  {
    this.dataService.userregistration(this.angForm.value.name,this.angForm.value.email,this.angForm.value.password)
      .pipe()
      .subscribe(
        (data: any)=> {
               alert("data inserted successfully");
              this.router.navigate(['login']);
              
          },
        (error: any)=> {
            console.log("Error");
          });
  }
  get f() { return this.angForm.controls; }
  get name() { return this.angForm.get('name'); }
  get email() { return this.angForm.get('email'); }
  get password() { return this.angForm.get('password'); }
}
