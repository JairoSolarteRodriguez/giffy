import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Gif, GifsResponse } from '../Interface/GifsResponses.interface'

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _history: string[] = []
  private _APIKEY: string = environment.apiKey
  private _APIURL: string = environment.apiUrl

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

    const params = new HttpParams()
      .set('api_key', this._APIKEY)
      .set('limit', '10')
      .set('q', query || this.last || 'random')
      .set('offset', 0)
      .set('lang', 'es')
      .set('rating', 'g')

    if (query) {
      if (!this._history.includes(query)) {
        this._history.unshift(query)
        this._history = this._history.splice(0, 9)

        localStorage.setItem('history', JSON.stringify(this._history))
      }
    }

    this.http.get<GifsResponse>(`${ this._APIURL}/search`, { params })
      .subscribe((response: GifsResponse) => {
        console.log(response.data)
        this.result = response.data
      })
  }
}
