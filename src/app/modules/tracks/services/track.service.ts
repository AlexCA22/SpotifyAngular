import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
 import { map, mergeMap, tap, catchError } from 'rxjs/operators';
import {  Observable, of} from 'rxjs';
import { environment } from 'src/environments/environment';
import { TrackModel } from '@core/models/tracks.model';


@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api;

  constructor(private http: HttpClient) {
    
  }

  private skipById(listTracks:TrackModel[], id:number):Promise<TrackModel[]>{
    return new Promise((resolve, reject) =>{
      const listTmp = listTracks.filter(a=> a._id = id )
      resolve(listTmp)
    })
  }

  // devolver todas las canciones
  getAllTracks$(): Observable <any>{
    return this.http.get(`${this.URL}/tracks`)
    .pipe(
      //retornamos el array
      map(({data}: any) =>{
        return data
      })
    )
  }

  // devuelve ñas canciones random
  getAllRandom$(): Observable <any>{
    return this.http.get(`${this.URL}/tracks`)
    .pipe(
      tap(data => console.log('asss', data)),
      
      //retornamos el array revertido
      mergeMap(({data}: any) => this.skipById(data, 2)), 
      tap(data => console.log('tofo ok', data)),
      // nos muestra el error
      catchError((err) =>{
        const {status, statusText} = err
        console.log('alerrrrtaa', [status, statusText])

        return of([])
      })
      )
  }
}
