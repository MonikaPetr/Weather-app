import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  weather: any;
  city: any;
  apiKey: any;
  weathers = [];
  htmlToAdd: any;
  htmlAdd: any;
  constructor(private http: HttpClient, ) { }

  ngOnInit() {
  }

  getWeather(city, id) {
    this.http.get('http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+id).subscribe(weather => {
      this.city = weather;
      this.apiKey = id;
      this.weathers.push(weather);
      console.log(weather);
      document.querySelector('#myTab').innerHTML +=`
          <li class="nav-item active" href="`+weather['name']+`">
            <a class="nav-link" id="home-tab" data-toggle="tab" href="#`+weather['name']+`" role="tab" aria-controls="`+weather['name']+`" aria-selected="true">`+weather['name']+`</a>
          </li>`;
      document.querySelector('#myTabContent').innerHTML += `
          <div style="margin: auto; width: 40%; margin-top: 50px;" class="tab-pane active" id="`+weather['name']+`" role="tabpanel" aria-labelledby="`+weather['name']+`-tab">
          <p>City</p>
          <div class="alert alert-primary name" role="alert">
          <h1>`+weather['name']+`</h1>
          </div>
          <p>Temperature</p>
          <div class="alert alert-success temperature" role="alert">
          <h1 *ngFor="let weather of weathers">`+weather['main']['temp']+`</h1>
          </div>
          <p>Wind Speed</p>
          <div class="alert alert-danger wind" role="alert">
          <h1 *ngFor="let weather of weathers">`+weather['wind']['speed']+`</h1>
          </div>
          <p>Humidity</p>
          <div class="alert alert-warning humidity" role="alert">
          <h1>`+weather['main']['humidity']+`</h1>
          </div>
        </div>
      `



    });
  }
}
