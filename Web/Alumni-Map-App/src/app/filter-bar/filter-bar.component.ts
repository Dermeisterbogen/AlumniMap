import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { Major } from "../model/major";
import { MAJORS } from "../model/major.data";

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  constructor(private router: Router) { }

  majors : Major[] = MAJORS;

  //39.96462866921976, -97.1857268754143
  //4.3 zoom
  
ngOnInit(): void { 

  console.log(this.majors)

  let loader = new Loader({
    apiKey: "AIzaSyD45LEtV6JF7emihinnYkZRxLegCJzWJRo"
  })

  loader.load().then(() => {
    new google.maps.Map(document.getElementById("map")!, {
      center: {lat: 39.96462866921976, lng: -97.1857268754143},
      zoom: 4.3
    })
  }) 
}

returnCheckedMajors(){

  var full = "";
  
  for(var names of this.majors)
  {
    if(names.checked == true)
    {
      full += names.name
    }
  }

  console.log(full);
  return full;

}

}
