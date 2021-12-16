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
let markers: google.maps.Marker[] = [];
let currinfo: any = null;

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

  submitMajorMinor() {
    var final = this.returnCheckedMajors() + "" + this.returnCheckedMinors();
    this.addAlumniByCheckbox(final);
  }

  returnCheckedMajors() {

    var full = "";
    for (var names of this.majors) {
      if (names.checked == true) {
        full += "|" + names.name;
      }
    }

    //console.log(full);
    return full;
  }

  returnCheckedMinors() {

    var full = "&";
    for (var names of this.minors) {
      if (names.checked == true) {
        full += "|" + names.name;
      }
    }

    //console.log(full);
    return full;

  }

  // hide and remove all markers from the array
  clearMarkers() {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  }

  // show all markers in the array on the map
  showMarkers() {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  // adds a marker to the map using Lat/Lng objects
  addMarker(alumni: any) {
    const marker = new google.maps.Marker({
      position: { lat: parseFloat(alumni.Lat), lng: parseFloat(alumni.Long) },
      map: null,
    });

    // Create the InfoWindow and attach the alumni information content to it
    const name = alumni.First + ' ' + alumni.Last;
    const contentString = '<h1 style="color: black">' + name + '</h1>' +
      '<p style="color: black">College: ' + alumni.School + '</p>' +
      '<p style="color: black">Graduation Date: ' + alumni.GradYear + '</p>' +
      '<p style="color: black">Major: ' + alumni.Major + '</p>' +
      '<p style="color: black">Minor: ' + alumni.Minor + '</p>' +
      '<p style="color: black">Workplace: ' + alumni.Title + " at " + alumni.Organization + " in " + alumni.City + '</p>';
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    // Add a click event to the marker that will open the InfoWindow
    marker.addListener("click", () => {
      infowindow.setContent(contentString);
      if (currinfo) {
        currinfo.close();
      }
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });
      currinfo = infowindow;
    });

    markers.push(marker);
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

    // display all markers
    this.showMarkers();
  }

  async addAlumniByCheckbox(options: any) {
    if (options === '&') {
      return;
    }

    // clear markers from map
    this.clearMarkers();

    // fetch the data into a json array
    async function getData(req: any) {
      const res = await fetch(req + '/options/' + options);
      return res.json();
    } options

    const alumni = await getData(req);

    // Add them all to the map; delay due to Google Maps API limit
    for (let i = 0; i < alumni.length; i++) {
      this.addMarker(alumni[i]);
    }

    // show markers on the map
    this.showMarkers();
  }
}