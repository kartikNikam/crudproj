import { Component } from '@angular/core';
import { DataserviceService } from './services/dataservice.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud1';
  loginbtn:boolean;
  logoutbtn:boolean;
  router: any;
  constructor(private dataService: DataserviceService) {
    dataService.getLoggedInName.subscribe(name => this.changeName(name));
    if(this.dataService.isLoggedIn())
    {
      console.log("loggedin");
      this.loginbtn=false;
      this.logoutbtn=true
    }
    else{
     this.loginbtn=true;
     this.logoutbtn=false
    }
}
private changeName(name: boolean): void {
  this.logoutbtn = name;
  this.loginbtn = !name;
}
logout()
{
  this.dataService.deleteToken();
  window.location.href = "http://localhost:4200";
  
}
}
