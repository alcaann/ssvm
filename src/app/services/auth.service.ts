import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first} from 'rxjs/operators';
import { LoginRequest, LoginResponse } from 'types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl:string = 'http://192.168.100.61';
  user = {}

  constructor(private httpClient: HttpClient, private router: Router) { }

  checkStatus(): Observable<boolean>{
    
    return new Observable<boolean>((observer)=>{
      //sthis.httpClient.post(this.baseUrl+'api/auth.php', );
    });
  }

  login(data: LoginRequest):void{
    this.httpClient.post(this.baseUrl+'api/login.php', data, {withCredentials: true}).pipe(first()).subscribe(
      (response:any) =>{
        let res = <LoginResponse> response;
        if(res.status){
          this.router.navigate(['/main']);
        }else{
          console.log(res.message);
        }
      }
    );
  }

}
