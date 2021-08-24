import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../services/dataservice.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Studentmodule } from '../studentmodule';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users: Studentmodule[] = [];
             constructor(private dataService: DataserviceService,private router:Router) { }

  ngOnInit(): void {
    this.getuserdetails();
  }
  getuserdetails()
  {
    this.dataService.getAllUsers().subscribe((response: { id: any; name: any;email: any; password: any;  }[]) =>
      {
        this.users = response.map((item: { id: any; name:any;email: any; password: any; }) =>
        {
          return new Studentmodule(
            item.id,
              item.name,
              item.email,
              item.password
          );
        });  //new usermodule
      });   //getAllusers() service
    }  

    updateUser(user: Studentmodule): void {
      window.localStorage.removeItem("editid");
      window.localStorage.setItem("editid", user.id.toString());
      this.router.navigate(['update']);
    };

    deleteuserdetails(user:Studentmodule)            //function
                 {
                 this.dataService.removeEmployee(user.id)       // service
                 .subscribe( data => {
                  //this.users = this.users.filter(u => u !== user);
                  this.getuserdetails();
                  alert("Data Deleted Successful");
                  (          error: any) => {
                    console.log("Error");
                  }
                 });  //service
                 } // deleteuserdetails()

    

  }

