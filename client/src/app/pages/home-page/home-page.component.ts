import { Component, OnInit } from '@angular/core';
import { dummyImages } from '../../tempdata';
// import { image } from '../../assets/logos/moments-image-gallery-high-resolution-logo-transparent.png'

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
