import { Injectable, EventEmitter } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject } from 'rxjs';
// import { BehaviorSubject, Observable, Observer, Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any> = new EventEmitter<any>()
   public trackInfo$: BehaviorSubject<any>= new BehaviorSubject(undefined)
  public audio!: HTMLAudioElement //audio

  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00')
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00')
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('pause')
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0)


  
  // myObservable1$: Subject<any> = new Subject
  // myObservable1$: Observable<any> = new Observable()
  // myObservable1$: BehaviorSubject<any>= new BehaviorSubject('👍')
  constructor() {
    this.audio = new Audio()
    this.trackInfo$.subscribe(responseOK =>{
      if(responseOK){
       
        this.setAudio(responseOK)
      }
      
      
    })
    this.listenAllEvens()

    // setTimeout(() =>{
    //   this.myObservable1$.next('👍')
    // },1000)
    // setTimeout(() =>{
    //   this.myObservable1$.error('🤢')
    // },3500)
    
    // this.myObservable1$ = new Observable (
    //   (observer:Observer<any>) =>{
    //     observer.next('🤔🤔🤔🤔')
    //     setTimeout(() =>{
    //       observer.complete()
    //     },1000)
    //     setTimeout(() =>{
    //       observer.next('🤔🤔🤔🤔')
    //     },2500)
    //     setTimeout(() =>{
    //       observer.error('🤔🤔🤔🤔')
    //     },3500)
    //   }
    // )
  }

  private listenAllEvens():void{
    this.audio.addEventListener('timeupdate', this.calculeTime , false)
    this.audio.addEventListener('playing', this.setPlayerStatus , false)
    this.audio.addEventListener('play', this.setPlayerStatus , false)
    this.audio.addEventListener('pause', this.setPlayerStatus , false)
    this.audio.addEventListener('ended', this.setPlayerStatus , false)
  }
  private setPlayerStatus = (state:any) =>{
    console.log('👍', state);
    switch(state.type){//si se esta reproduciendo
      case 'play':
        this.playerStatus$.next('play')
        break;
      case 'playing':
        this.playerStatus$.next('playing')
        break
      case 'ended':
        this.playerStatus$.next('ended')
        break
      
      default:
        this.playerStatus$.next('paused')
        break;
    }
    
  }
  private calculeTime = () =>{
    
    const {duration, currentTime} = this.audio
    console.log([duration , currentTime]);
    this.setTimeElapsed(currentTime)
    this.setTimeRemaining(currentTime, duration)
    this.setPercentage(currentTime, duration)
  }
  private setPercentage(currentTime: number, duration:number): void{
    let percentage = (currentTime *100)/duration
    this.playerPercentage$.next(percentage)
  }

  private setTimeElapsed(currentTime: number): void{
     let seconds = Math.floor(currentTime % 60)
     let minutes = Math.floor((currentTime / 60) %60)

     const displaySeconds = (seconds <10) ? `0${seconds}` : seconds
     const displayMinutes = (minutes <10) ? `0${minutes}` : minutes

     const displayFormat = `${displayMinutes}: ${displaySeconds}`

     this.timeElapsed$.next(displayFormat)
  }

  private setTimeRemaining(currentTime: number, duration: number){

    let timeLeft = duration - currentTime
    let seconds = Math.floor(timeLeft % 60)
    let minutes = Math.floor((timeLeft / 60) %60)
    const displaySeconds = (seconds <10) ? `0${seconds}` : seconds
    const displayMinutes = (minutes <10) ? `0${minutes}` : minutes

    const displayFormat = `${displayMinutes}: ${displaySeconds}`

    this.timeRemaining$.next(displayFormat)
  }

  //funciones publicas
  public setAudio(track : TrackModel):void{
    console.log('👍👍👍', track);
    this.audio.src = track.url
    this.audio.play()
  }

  public togglePlayer(): void{
    (this.audio.paused) ? this.audio.play() : this.audio.pause()
  }
}
