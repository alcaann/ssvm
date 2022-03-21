import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { first, Observable, Subject } from 'rxjs';
import { DBGame, GameGenre, GameID, GenericResponse, LoginRequest, NewGameRequest } from 'types';
import { FrontService } from '../front.service';

@Injectable({
  providedIn: 'root'
})
export class BackService {
  baseUrl:string = 'http://192.168.100.61';
  loginStatus: Subject<boolean> = new Subject<boolean>();
  isLogged: boolean = false;

  constructor(private httpClient: HttpClient, private router:Router, private front: FrontService) {
    this.loginStatus.subscribe((s)=>this.isLogged = s);
    this.auth().pipe(first()).subscribe();
   }

  uploadGame(gameData: NewGameRequest): Observable<GenericResponse>{
    return <Observable<GenericResponse>>this.httpClient.post(this.baseUrl+'/api/upload.php',gameData,{withCredentials: true});
  }

  getGames(genre?: GameGenre): Observable<GenericResponse>{
    return <Observable<GenericResponse>>this.httpClient.post(this.baseUrl+'/api/getLibrary.php', {genre: genre}, {withCredentials: true});
  }

  deleteGame(id: GameID): Observable<GenericResponse>{
    return <Observable<GenericResponse>>this.httpClient.post(this.baseUrl+'/api/delete.php', {id: id}, {withCredentials: true});
  }

  login(loginData: LoginRequest):Observable<GenericResponse>{
    return <Observable<GenericResponse>>this.httpClient.post(this.baseUrl+'/api/login.php',loginData, {withCredentials:  true});
  }

  logout(): Observable<GenericResponse>{
    this.loginStatus.next(false);
    return <Observable<GenericResponse>>this.httpClient.get(this.baseUrl+"/api/logout.php", {withCredentials: true})
  }

  auth(): Observable<boolean>{
    return new Observable((subscriber)=>{
      this.httpClient.get(this.baseUrl+"/api/auth.php",    {withCredentials: true}).pipe(first()).subscribe((response) =>{
        let res: GenericResponse = <GenericResponse>response;

        console.log("AUTH():",res);
        if(res.status){
          this.loginStatus.next(true);
          subscriber.next(true);

        }
        else{
          this.loginStatus.next(false);
          this.router.navigate(['/home']);
          subscriber.next(false);
        }
      });
    });
  }

  
}
