import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs'; //Programacion reactiva
@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
 
  

  listObservers$: Array<Subscription>= []

  state:string = 'paused'
  constructor(public multimediaService:MultimediaService) { }

  ngOnInit(): void {

    const observer1$ = this.multimediaService.playerStatus$
    .subscribe(status => this.state = status)

    this.listObservers$ = [observer1$]
    this.multimediaService.trackInfo$
      
    
    // const observer1$: Subscription = this.multimediaService.callback.subscribe(
    //   (response: TrackModel) =>{
    //     console.log('Recibiendo canción...', response);
    //   }
    // )
    // this.listObservers$ = [observer1$]
    // const observable1$ = this.multimediaService.myObservable1$
    // .subscribe(
    //   (responseOk) =>{
    //     console.log('👍agua ok', responseOk);
        
    //   },
    //   (responseFail) =>{
    //     // error
    //     console.log('🤢', responseFail);
        
    //   }
    
    // )


  }
 ngOnDestroy(): void {
   this.listObservers$.forEach(u => u.unsubscribe())
   console.log('booooooooooooooooooom')
 }

}
