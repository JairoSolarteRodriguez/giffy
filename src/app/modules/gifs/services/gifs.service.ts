import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _history: string[] = []

  get history() {
    return [...this._history]
  }

  constructor() { }

  buscarGifs( query: string ) {
    query = query.trim().toLowerCase()

    if( !this._history.includes( query ) ){
      this._history.unshift( query )
    }

    this._history = this._history.splice(0, 9)

    console.log(this._history)
  }
}
