import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import {
  ActivatedRoute,
  Event,
  NavigationEnd,
  NavigationError,
  Router
} from '@angular/router';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { CitiesService } from '../../../services/cities.service';
import { City } from '../../../interfaces/city.interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public cities: City[];
  public isvisible: boolean;
  public modalHeader: string;
  public modalBody: string;
  public modalFooter: string;
  public clock: Observable<Date>;
  private _regionKey: string;

  @Output() messageEvent = new EventEmitter<String>();

  constructor(
    private _ar: ActivatedRoute,
    private _cs: CitiesService,
    private _router: Router
    ) {
      this.clock = interval(1000).pipe(map(tick => new Date()));
      this.isvisible = false;
      this.modalHeader = 'Agrega una ciudad';
      this.modalBody = '';
      this.modalFooter = '';
      this._router.events.subscribe( (event: Event) => {
        if (event instanceof NavigationEnd) {
          this._regionKey = this._ar.snapshot.paramMap.get('regionKey');
          this._cs.getCities(this._regionKey).subscribe(city => {
            this.cities = city;
          });
        }
        if (event instanceof NavigationError) {
            console.log(event.error);
        }
    });
  }

  public deleteItem(_: any, city: City): void {
    this._cs.deleteItem(city);
  }

  public openModal(): void {
    this.isvisible = true;
  }

  public closeModal(event): void {
    this.isvisible = event;
  }
}
