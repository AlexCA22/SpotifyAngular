import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  // Analiza los hijos de los diferentes campos
  formLogin:FormGroup = new FormGroup({})
  constructor() { }

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
      const body = this.formLogin.value
      console.log('%%%', body)
   }
}
