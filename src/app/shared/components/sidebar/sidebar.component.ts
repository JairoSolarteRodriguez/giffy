import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/modules/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor( private gifsServices: GifsService) { }

  get history(): string[] {
    return this.gifsServices.history
  }

  ngOnInit(): void {
  }

}
