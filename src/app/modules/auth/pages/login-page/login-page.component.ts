import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  errorSession: boolean = false
  // Analiza los hijos de los diferentes campos
  formLogin:FormGroup = new FormGroup({})
  constructor(private authService: AuthService, private cookie: CookieService) {
    
  }

  ngOnInit(): void {
    this.formLogin = new FormGroup(
      {
        email:new FormControl('', [
          Validators.required,
          Validators.email

        ]),
        password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25)
        ]
        )

      }
    )
  }
   sendLogin(): void{
      const {email, password} = this.formLogin.value
      this.authService.sendCredentials(email, password)
      // cuando la clave y contraseña es correcta
      .subscribe(responseOk => {
        console.log('sesion iniciada correctamnete', responseOk);
        const {tokenSession, data }= responseOk
        this.cookie.set('token', tokenSession, 4, '/')
      },
      err =>{// errores de 400 o mayorr
        this.errorSession= true
        console.log('error de email o password');
        
      })
   }
}
