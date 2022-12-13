import { Component, OnInit } from '@angular/core';
import { Gif } from '../../Interface/GifsResponses.interface';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {

  get results(): Gif[]{
    return this.gifsService.result;
  }

  constructor( private gifsService: GifsService ) {
    this.gifsService.buscarGifs()
  }
}
