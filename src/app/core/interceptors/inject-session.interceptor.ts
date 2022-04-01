import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class InjectSessionInterceptor implements HttpInterceptor {

  constructor( private coockieService: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    try{
      const token = this.coockieService.get('token')
      let newRequest = request
      newRequest = request.clone({
        setHeaders:{
          authorization: `Bearer ${token}`,
          CUSTOM_HEADER: 'Hola'
        }
      })
      return next.handle(request)


    }catch(e){
      console.log('errror', e);
      return next.handle(request)
      
    }
  }
}
