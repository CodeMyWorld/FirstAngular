import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'click-me',
  templateUrl: './click-me.component.html',
  styleUrls: ['./click-me.component.css']
})
export class ClickMeComponent implements OnInit {
  clickMessage = 'havent click yet';
  values = '';
  constructor() { }

  ngOnInit() {
  }

  onClickMe(){
    this.clickMessage = 'You just clicked the button';
  }
  onKey(event: any){
    this.values += event.key + ' | ';
  }


}
