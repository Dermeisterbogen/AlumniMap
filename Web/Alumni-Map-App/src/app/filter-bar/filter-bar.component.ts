import { Position } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { Major } from "../model/major";
import { MAJORS } from "../model/major.data";
import { Minor } from "../model/minor";
import { MINORS } from "../model/minor.data";
import { FetchAlumniService } from '../service/fetch-alumni.service';

const req = 'http://localhost:4321/api/alumni';
let geocoder: google.maps.Geocoder;
let map: google.maps.Map;

//declare function initMap() : any;
//declare function addAlumni(): any;
declare function fillDiv(request: any): any;

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  constructor(private router: Router, private fetchService: FetchAlumniService) { }

  majors: Major[] = MAJORS;
  minors: Minor[] = MINORS;

  //39.96462866921976, -97.1857268754143
  //4.3 zoom

  ngOnInit(): void {

    let loader = new Loader({
      // apiKey: "AIzaSyD45LEtV6JF7emihinnYkZRxLegCJzWJRo"
      apiKey: 'AIzaSyAebKdu9FE6-XWmo9Skp8YyUEunApizolg'
    })

    loader.load().then(() => {
      geocoder = new google.maps.Geocoder();
      map = new google.maps.Map(document.getElementById("map")!, {
        center: { lat: 39.96462866921976, lng: -97.1857268754143 },
        zoom: 4.3
      })
    })

    this.useFunction();

  }

  useFunction() {
    // initMap();
    //this.fetchService.fetchAlumni();
    // this.fillDiv(req);
    this.addAlumni();
  }

  returnAll() {

    var final = this.returnCheckedMajors() + " " + this.returnCheckedMinors();

    console.log(final);
    return final;

  }

  returnCheckedMajors() {

    var full = "Major=";
    for (var names of this.majors) {
      if (names.checked == true) {
        full += " | " + names.name;
      }
    }

    //console.log(full);
    return full;

  }

  returnCheckedMinors() {

    var full = "Minor=";
    for (var names of this.minors) {
      if (names.checked == true) {
        full += " | " + names.name;
      }
    }

    //console.log(full);
    return full;

  }

  // adds a marker to the map using Lat/Lng objects
  addMarker(alumni: any) {
    const marker = new google.maps.Marker({
      position: { lat: alumni.Lat, lng: alumni.Long },
      map: map,
    });

    // Create the InfoWindow and attach the alumni information content to it
    const name = alumni.First + ' ' + alumni.Last;
    const contentString = '<h1>' + name + '</h1>' +
      '<p>College: ' + alumni.School + '</p>' +
      '<p>Graduation Date: ' + alumni.GradYear + '</p>' +
      '<p>Major: ' + alumni.Major + '</p>' +
      '<p>Minor: ' + alumni.Minor + '</p>' +
      '<p>Workplace: ' + alumni.Title + " at " + alumni.Organization + " in " + alumni.City + '</p>';
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    // Add a click event to the marker that will open the InfoWindow
    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });
    });
  }

  // converts the addresses of the alumni to coordinates
  // USE ONLY FOR NEW ALUMNI DATA
  addressToCoords(alumni: any) {
    const address = alumni.City;
    geocoder.geocode({ 'address': address }, (results: any, status) => {
      if (status == 'OK') {
        this.addMarker(alumni);
      } else {
        console.error(`Geocode was not successful for -${address}- for the following reason: ${status}`);
      }
    });
  }

  // Adds all alumni to the map
  async addAlumni() {
    // fetch the data into a json array
    async function getData(req: any) {
      const res = await fetch(req);
      return res.json();
    }

    const alumni = await getData(req);

    // Add them all to the map; delay due to Google Maps API limit
    for (let i = 0; i < alumni.length; i++) {
      this.addMarker(alumni[i]);
    }
  }
}