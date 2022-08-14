import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouteOneComponent } from './route-one/route-one.component';
import { RouteTwoComponent } from './route-two/route-two.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouteThreeComponent } from './route-three/route-three.component';

@NgModule({
  declarations: [
    AppComponent,
    RouteOneComponent,
    RouteTwoComponent,
    PageNotFoundComponent,
    RouteThreeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'route-one', component: RouteOneComponent },
      { path: 'route-two', component: RouteTwoComponent },
      { path: 'route-three', component: RouteThreeComponent },
      { path: '', redirectTo: 'route-one', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
