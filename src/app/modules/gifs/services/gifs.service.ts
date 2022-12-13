import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Gif, GifsResponse } from '../Interface/GifsResponses.interface'

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _history: string[] = []
  private _APIKEY: string = environment.apiKey

  public result: Gif[] = []
  public last!: string

  get history() {
    return [...this._history]
  }

  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('history')!) || []
    this.last = this._history[0]
  }

  buscarGifs(query?: string) {
    query = query?.trim().toLowerCase()
    const URL = query
      ? `https://api.giphy.com/v1/gifs/search?api_key=${this._APIKEY}&q=${query}&limit=10&offset=0&rating=g&lang=es`
      : `https://api.giphy.com/v1/gifs/search?api_key=${this._APIKEY}&q=${this.last}&limit=10&offset=0&rating=g&lang=es`

    if (query) {
      if (!this._history.includes(query)) {
        this._history.unshift(query)
        this._history = this._history.splice(0, 9)

        localStorage.setItem('history', JSON.stringify(this._history))
      }
    }

    this.http.get<GifsResponse>(URL).subscribe((response: GifsResponse) => {
      console.log(response.data)
      this.result = response.data
    })
  }
}
