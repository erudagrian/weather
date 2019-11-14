
import {combineLatest as observableCombineLatest ,  BehaviorSubject ,  Observable } from 'rxjs/index';
import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';



import { City } from '../models/city.model';

@Injectable()
export class CitiesService {

  continentFilter: BehaviorSubject<string|null>;
  citiesCollection: AngularFirestoreCollection<City>;
  cities: Observable<City[]>;
  cityDoc: AngularFirestoreDocument<City>;

  constructor(public afs: AngularFirestore) {
    this.continentFilter = new BehaviorSubject(null);
    this.citiesCollection = this.afs.collection<City>('cities');
    this.cities = observableCombineLatest(
      this.continentFilter
    ).pipe(switchMap(([continent]) =>
      afs.collection<City>('cities', ref => {
        if (continent) {
          return ref.where('continent', '==', continent);
        }
        return ref;
      }).snapshotChanges().pipe(map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as City;
          data.id = a.payload.doc.id;
          return data;
        });
      }))
    ));
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

  addCity(city) {
    this.afs.collection('cities').add(this.convertObject(city));
    // this.citiesCollection.add(city);
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

   convertObject(data) {
      const obj = {};
      Object.keys(data).forEach(function(key, index) {
          console.log(key);
          obj[key] = data[key];
      });
      return obj;
  }
}
