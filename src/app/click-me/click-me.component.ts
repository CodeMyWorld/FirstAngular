import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service'
import {Hero} from '../hero'

@Component({
  selector: 'click-me',
  templateUrl: './click-me.component.html',
  styleUrls: ['./click-me.component.css']
})
export class ClickMeComponent implements OnInit {
  clickMessage = 'havent click yet';
  values = '';
  constructor(private httpService: HttpServiceService) { }

  ngOnInit() {
  }

  onClickMe(){
    this.httpService.getHeroes().then(heroes => this.clickMessage = heroes);
  }
  onKey(value: string){
    this.values += value + ' | ';
  }
}
