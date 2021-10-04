import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  //39.96462866921976, -97.1857268754143
ngOnInit(): void { 
  let loader = new Loader({
    apiKey: 'AIzaSyBbCJeZpwPUZ-k4-3QD-9lAI4bKlXubDWc'
  })

  loader.load().then(() => {
    new google.maps.Map(document.getElementById("map")!, {
      center: {lat: 39.96462866921976, lng: -97.1857268754143},
      zoom: 4.3
    })
  }) 
}

}
