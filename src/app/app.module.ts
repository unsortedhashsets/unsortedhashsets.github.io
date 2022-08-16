import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { InitComponent } from './pages/init/init.component';
import { AboutComponent } from './components/about/about.component';
import { ResumeComponent } from './components/resume/resume.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContactComponent } from './components/contact/contact.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';

@NgModule({
  declarations: [
    AppComponent,
    InitComponent,
    AboutComponent,
    ResumeComponent,
    PortfolioComponent,
    ContactComponent,
    PageNotFoundComponent,
    LayoutPageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'init', component: InitComponent },
      { path: 'about', component: LayoutPageComponent, },
      { path: 'resume', component: LayoutPageComponent },
      { path: 'portfolio', component: LayoutPageComponent },
      { path: 'contact', component: LayoutPageComponent },
      { path: '', redirectTo: '/init', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
