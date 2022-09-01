import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.less']
})
export class InitComponent implements OnInit {

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
