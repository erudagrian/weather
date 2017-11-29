import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule} from 'angularfire2/firestore';
import { environment } from '../environments/environment';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { CardComponent } from './components/elements/card/card.component';

import { CitiesService } from './services/cities.service';
import { YahooWeatherService } from './services/yahoo-weather.service';
import { ModalComponent } from './components/elements/modal/modal.component';
import { FloatingmenuComponent } from './components/elements/floatingmenu/floatingmenu.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    AboutComponent,
    CardComponent,
    ModalComponent,
    FloatingmenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'angularfs'),
    AngularFirestoreModule,
    HttpModule,
  ],
  providers: [
    CitiesService,
    YahooWeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
