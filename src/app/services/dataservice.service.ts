import { Injectable } from '@angular/core';
import { Studentmodule } from '../studentmodule';
import {  Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  baseUrl:string = "http://localhost/crud1/phppages";
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
    constructor(private httpClient : HttpClient) { }

    
         public userregistration(name: string,email: string,password:string):Observable<Studentmodule[]> {
          return this.httpClient.post<any>(this.baseUrl + '/registration.php',{name,email,password })
               
           .pipe(map((Studentmodule) => {
                   return Studentmodule;
               }));
         }

         getAllUsers() : Observable<Studentmodule[] > {
          return this.httpClient.get<Studentmodule[]>(this.baseUrl+'/getdata.php');
        }

        removeEmployee(id: number): Observable<Studentmodule[]> {
          return this.httpClient.delete<Studentmodule[]>(this.baseUrl+'/deletedata.php?id='+id);
        }

         public userlogin(email: any, password: any) {
          return this.httpClient.post<any>(this.baseUrl + '/login.php', { email, password })
              .pipe(map(Studentmodule => {
                console.log("service");
                //alert(Usermodule[0].name);
                  this.setToken(Studentmodule[0].name);
                  this.getLoggedInName.emit(true);
                  return Studentmodule;
              
                }));
        }

        public getUserId(id: number): Observable<Studentmodule[]>
             {
                 return this.httpClient.get<Studentmodule[]>(
                 this.baseUrl + '/getonedata.php?'+ 'id=' +id 
                 );
             }
             public updateuserdetails(id: any,name: any,email: any,password: any) {
              return this.httpClient.post<any>(this.baseUrl + '/updateuser.php', {id,name,email,password})
                .pipe(map(Studentmodule => {
                      return Studentmodule;
                  }));
             
            }


        setToken(token: string) {
          localStorage.setItem('token', token);
        }
         
        getToken() {
          return localStorage.getItem('token');
        }
         
        deleteToken() {
          localStorage.removeItem('token');
        }
         
        isLoggedIn() {
          const usertoken = this.getToken();
          if (usertoken != null) {
            return true
          }
          return false;
        }
}
