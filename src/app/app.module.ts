import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouteTwoComponent } from './route-two/route-two.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouteThreeComponent } from './route-three/route-three.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RouteTwoComponent,
    PageNotFoundComponent,
    RouteThreeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'route-two', component: RouteTwoComponent },
      { path: 'route-three', component: RouteThreeComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
