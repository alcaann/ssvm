import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  setDefaultImg(event: Event){
    (<HTMLImageElement>event.target).src = "assets/img/webDeveloperSimulator.png";
  }

}
