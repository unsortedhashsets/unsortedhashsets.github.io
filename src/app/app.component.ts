import { Component, OnInit } from '@angular/core';
import { ParticlesConfig } from 'src/app/utils/particles-config';

declare let particlesJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {

  public ngOnInit(): void {
    this.invokeParticles();
  }

  title = 'business-card-site';

  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function () { });
  }
}
