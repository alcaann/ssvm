import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { ToastData } from 'types';
import { FrontService } from './front.service';
import { BackService } from './services/back.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  header:string ="Videojuegos.io";
  isLogged:boolean;
  loginSubscription?:Subscription;
  
  showToast: boolean = false;
  toastData:ToastData = {title: "", msg: "", date: "00:00" }
  toastPile:Array<ToastData> = [];

  constructor(private back: BackService, private router: Router, private front:FrontService){
    this.isLogged = this.back.isLogged;
    this.loginSubscription = back.loginStatus.subscribe((status)=>{
      this.isLogged = status;
    });

    this.front.toastEmitter.subscribe(async (data)=>{
      console.log(data);
      if(this.toastPile.length){
        this.toastPile.push(data);
      }else{
        this.toastPile.push(data);
      while (this.toastPile.length){
        this.toastData = this.toastPile[0];
        let now = new Date();
        this.toastData.date = now.getHours()+":"+now.getMinutes()+":"+now.getSeconds(); 
        this.showToast = true;
        console.log("mostramo");
        await new Promise(resolve=>setTimeout(resolve, 3000));
        this.showToast = false;
        this.toastPile.shift();
      }}


    });

  }
  logout(){
    this.back.logout().pipe(first()).subscribe((res)=>{
      console.log(res);
    });
    this.router.navigate(['/home']);
  }

}
