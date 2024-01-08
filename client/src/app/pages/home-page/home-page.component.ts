import { Component, OnInit } from '@angular/core';
import { dummyImages } from '../../tempdata';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  images: string[];
  ngOnInit(): void {
      this.images = dummyImages;
  }
}
