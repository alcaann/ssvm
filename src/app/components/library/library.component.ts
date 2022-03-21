import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { first, Subscription } from 'rxjs';
import { BackService } from 'src/app/services/back.service';
import { DBGame, GameID, GenericResponse } from 'types';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements AfterViewInit, OnInit, OnDestroy{

  mousePosition?: {x: number, y:number};
  offset: Array<number> = [0,0];
  @ViewChild('movable')movableRef?: ElementRef ;
  movableDiv?:HTMLDivElement;
  isDown: boolean = false;

  gameList:Array<DBGame> = [];
  isLogged:boolean;
  loginSubscription?: Subscription;

  constructor(private back: BackService) {
    this.isLogged = this.back.isLogged;
   }

  ngOnInit(): void {
    this.updateLibrary();
    this.back.loginStatus.subscribe((status)=>this.isLogged = status);
    

  }
  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
  updateLibrary(){
    this.back.getGames().pipe(first()).subscribe((response)=>{
      console.log(response);
      if(response.status)
      this.gameList = <Array<DBGame>>response.data;
    });
  }

  delete(gameID?: GameID){
  let id = <GameID>gameID;
  this.back.deleteGame(id).pipe(first()).subscribe((res)=>{
    console.log(res);
    if(res.status){
      this.updateLibrary();
    }
  });
  }

  ngAfterViewInit(): void {
    this.movableDiv = <HTMLDivElement>this.movableRef?.nativeElement;
   this.movableDiv.style.position = "absolute";
    
    this.movableDiv.addEventListener('mousedown', (e)=>{
        this.isDown = true;
        this.movableDiv = <HTMLDivElement>this.movableDiv;
        this.offset = [
            this.movableDiv.offsetLeft - e.clientX,
            this.movableDiv.offsetTop - e.clientY
        ];
    }, true);
    
    this.movableDiv.parentElement?.addEventListener('mouseup', ()=> {
        this.isDown = false;
    }, true);
    
    this.movableDiv.parentElement?.addEventListener('mousemove', (event: MouseEvent)=> {
        event.preventDefault();
        if (this.isDown) {
            this.mousePosition = {
        
                x : event.clientX,
                y : event.clientY
        
            };
            this.movableDiv = <HTMLDivElement>this.movableDiv;
            this.movableDiv.style.left = (this.mousePosition.x + this.offset[0]) + 'px';
            this.movableDiv.style.top  = (this.mousePosition.y + this.offset[1]) + 'px';
        }
    }, true);

  }

}
