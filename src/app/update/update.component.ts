import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataserviceService } from '../services/dataservice.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  angForm: FormGroup;
  constructor(private fb: FormBuilder,private dataService: DataserviceService,private router:Router){
    this.angForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
      password: ['', Validators.required],
      id: ['']
 
    });
  }

  ngOnInit(): void {
    this.angForm=new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      id:new FormControl()
    });
    let id = window.localStorage.getItem("editid");
    
    if(!id) {
      this.router.navigate(['list-user']);
      return;
   }
    this.dataService.getUserId(+id)
      .subscribe( data => {
       // this.angForm.controls[email].setValue('name')
       // this.email.nativeElement.value = 'This is new value';
        this.angForm.patchValue({
          id:data[0].id,name: data[0].name, email: data[0].email, password: data[0].password
 
       });
      });
  }
  postdata()
  {
    this.dataService.updateuserdetails(this.angForm.value.id,this.angForm.value.name,this.angForm.value.email,this.angForm.value.password)
  
    .pipe()
    .subscribe(
        data => {
          alert ("data updated successfully");
            this.router.navigate(['dashboard']);
        },
        error => {
          alert ("data not updated successfully");
        });
  
  }
  get name() { return this.angForm.get('name'); }
  get email() { return this.angForm.get('email'); }
  get password() { return this.angForm.get('password'); }
  get id() { return this.angForm.get('id'); }
}
