import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { FrontService } from 'src/app/front.service';
import { BackService } from 'src/app/services/back.service';
import { LoginRequest } from 'types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
@ViewChild('emailInput')emailElement?:ElementRef;
@ViewChild('passwordInput')passwordElement?:ElementRef;
  isNewUser:boolean = false;
  submitText:string = "Iniciar sesión";

  constructor(private back: BackService, private router: Router, private front: FrontService) { }

  ngOnInit(): void {
  }

  toggleForm(event: Event){
    const isChecked = (<HTMLInputElement>event.target).checked;
    this.isNewUser = isChecked;
    this.submitText = this.isNewUser?"Registrarse":"Iniciar sesión";
  }

  submitForm(){
    if(!this.isNewUser){
    let loginData:LoginRequest = {
      email: this.emailElement?.nativeElement.value,
      password: this.passwordElement?.nativeElement.value
    };

    if(loginData.email && loginData.password){
      this.back.login(loginData).pipe(first()).subscribe((response)=>{
        console.log("login():", response);
        if(response.status){
          this.front.toastEmitter.next({title: "Éxito", msg: "Se ha iniciado sesión correctamente."})
          this.router.navigate(['/admin']);
        }else{
          this.front.toastEmitter.next({title: "Error", msg: "Credenciales no válidas."})
          console.log(response);
        }
      });
    }

  }
}

}
