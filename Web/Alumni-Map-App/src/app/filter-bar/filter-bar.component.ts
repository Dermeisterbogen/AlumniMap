import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { Major } from "../model/major";
import { MAJORS } from "../model/major.data";
import { Minor } from "../model/minor";
import { MINORS } from "../model/minor.data";
import { FetchAlumniService } from '../service/fetch-alumni.service';

const req = 'http://localhost:1234/api/alumni';

//declare function initMap() : any;
//declare function addAlumni(): any;
declare function fillDiv(request: any): any;

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  constructor(private router: Router, private fetchService:FetchAlumniService) { }

  majors : Major[] = MAJORS;
  minors: Minor[] = MINORS;

  //39.96462866921976, -97.1857268754143
  //4.3 zoom
  
ngOnInit(): void { 

  let loader = new Loader({
    apiKey: "AIzaSyD45LEtV6JF7emihinnYkZRxLegCJzWJRo"
  })

  loader.load().then(() => {
    new google.maps.Map(document.getElementById("map")!, {
      center: {lat: 39.96462866921976, lng: -97.1857268754143},
      zoom: 4.3
    })
  }) 

  this.useFunction();

}

useFunction(){
  // initMap();
  //this.fetchService.fetchAlumni();
  fillDiv(req);
  //addAlumni();
}

returnAll(){
  
  var final = this.returnCheckedMajors() + " " + this.returnCheckedMinors();

  console.log(final);
  return final;

}

returnCheckedMajors(){

  var full = "Major=";
  for(var names of this.majors)
  {
    if(names.checked == true)
    {
      full += " | " + names.name;
    }
  }

  //console.log(full);
  return full;

}

returnCheckedMinors(){

  var full = "Minor=";
  for(var names of this.minors)
  {
    if(names.checked == true)
    {
      full += " | " + names.name;
    }
  }

  //console.log(full);
  return full;

}

}
