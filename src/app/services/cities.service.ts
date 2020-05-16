
import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { City } from '../interfaces/city.interface';

@Injectable()
export class CitiesService {
  private _cities: Observable<City[]>;
  private _citiesCollection: AngularFirestoreCollection<City>;
  private _cityDoc: AngularFirestoreDocument<City>;

  constructor(private _afs: AngularFirestore) {
    this._citiesCollection = this._afs.collection<City>('cities');
    this._cities = this._citiesCollection
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as City;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  getCities(regionKey: string = null) {
    if (!regionKey) {
      return this._cities;
    }
    return this._cities.pipe(
      map(cities => cities.filter(city => city.Region.ID === regionKey))
    );
  }

  addCity(city: City) {
    this._afs.collection('cities').doc(city.Key.toString()).set(city);
  }

  updateItem(city: City) {
    this._cityDoc = this._afs.doc(`items/${city.Key}`);
    this._cityDoc.update(city);
  }

  deleteItem(city: City) {
    this._cityDoc = this._afs.doc(`items/${city.Key}`);
    this._cityDoc.delete();
  }
}
