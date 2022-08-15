import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-route-three',
  templateUrl: './route-four.component.html',
  styleUrls: ['./route-four.component.less']
})
export class RouteFourComponent implements OnInit {

  constructor() { }

  public getScreenWidth: any;
  public getScreenHeight: any;

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

}
