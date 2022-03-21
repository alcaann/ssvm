import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BackService } from 'src/app/services/back.service';
import { first } from 'rxjs';
import { GameCover, GameDescription, GameGenre, GameTitle, NewGameRequest } from 'types';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @ViewChild('titleInput') titleElement?:ElementRef;
  @ViewChild('genreInput') genreElement?:ElementRef;
  @ViewChild('descInput')descElement?:ElementRef;
  coverImage?:File | null;
  imgSrc?: GameCover;
  errorMessage:string = "";
  constructor(private back: BackService) { 
  }
  
  ngOnInit(): void {
    
  }
  
  inputFile(event: Event){
    let files: FileList|null = (<HTMLInputElement>event.target).files;
    if(files && files[0]){
    this.coverImage = files[0];
    const reader = new FileReader();
    reader.onload = e=> this.imgSrc = <string>reader.result;
    reader.readAsDataURL(this.coverImage);
    }
  }
  
  submitForm(){
    let gameData: NewGameRequest = {
      coverImage: <GameCover>this.imgSrc,
      title: <GameTitle>this.titleElement?.nativeElement.value,
      genre: <GameGenre>this.genreElement?.nativeElement.value,
      description: <GameDescription>this.descElement?.nativeElement.value
    }
    let iterableGD: any = <any>gameData;
    for(var field in iterableGD){
      if(!iterableGD[field] || iterableGD[field] == ""){
        console.log("falta ", field)
        this.errorMessage = "Please fill in all fields.";
        return;
      }
    }
    this.errorMessage = "";
    
    this.back.uploadGame(gameData).pipe(first()).subscribe((response:any)=>{
      console.log(response);
    });


  }

}
