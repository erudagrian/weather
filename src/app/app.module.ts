import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { CardComponent } from './components/elements/card/card.component';

import { CitiesService } from './services/cities.service';
import { WeatherService } from './services/weather.service';
import { ModalComponent } from './components/elements/modal/modal.component';
import { FloatingmenuComponent } from './components/elements/floatingmenu/floatingmenu.component';
import { NewcityformComponent } from './components/pages/home/newcityform/newcityform.component';
import { AutocompleteComponent } from './components/elements/autocomplete/autocomplete.component';
import { SunComponent } from './components/elements/card/weather/sun/sun.component';
import { WeatherComponent } from './components/elements/card/weather/weather.component';

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
    NewcityformComponent,
    AutocompleteComponent,
    SunComponent,
    WeatherComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    CitiesService,
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
