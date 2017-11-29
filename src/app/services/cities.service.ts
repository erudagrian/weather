import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';

import { City } from '../models/city.model';

@Injectable()
export class CitiesService {

  continentFilter: BehaviorSubject<string|null>;
  citiesCollection: AngularFirestoreCollection<City>;
  cities: Observable<City[]>;
  cityDoc: AngularFirestoreDocument<City>;

  constructor(public afs: AngularFirestore) {
    this.continentFilter = new BehaviorSubject(null);
    this.citiesCollection = this.afs.collection('cities');
    this.cities = Observable.combineLatest(
      this.continentFilter
    ).switchMap(([continent]) =>
      afs.collection<City>('cities', ref => {
        let query: firebase.firestore.Query = ref;
        if (continent) {
          query = query.where('continent', '==', continent);
        }
        return query;
      }).snapshotChanges().map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as City;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    /* this.citiesCollection = this.afs.collection('cities', ref => ref.orderBy('name', 'asc'));
    this.cities = this.citiesCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as City;
        data.id = a.payload.doc.id;
        return data;
      });
    });*/
  }

  getCities() {
    return this.cities;
  }

  addItem(city: City) {
    this.citiesCollection.add(city);
  }

  updateItem(city: City) {
    this.cityDoc = this.afs.doc(`items/${city.id}`);
    this.cityDoc.update(city);
  }

  deleteItem(city: City) {
    this.cityDoc = this.afs.doc(`items/${city.id}`);
    this.cityDoc.delete();
  }

  filterByContinent(continent: string|null) {
    this.continentFilter.next(continent);
  }

}
