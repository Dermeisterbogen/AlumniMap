import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  constructor(private router: Router) { }

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
