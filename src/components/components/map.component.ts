import {Component, OnInit, ViewChild} from '@angular/core';
import { } from 'googlemaps';
import {Paho} from 'ng2-mqtt/mqttws31';
@Component({
  selector: 'wb-map',
  templateUrl: '../../system/templates/components/map.html'
})
export class MapComponent implements OnInit {

  @ViewChild('map') mapElement: any;
  map: google.maps.Map;
  lat = 35.2271;
  lng = -80.8431;
  marker = { latitude: this.lat, longitude: this.lng };
  mapTypeId = 'roadmap';
  host = 'ws://broker.mqtt-dashboard.com:8000/mqtt';
  mqtt;
  percent = 0;
  barClass = {
    'bg-success': true,
    'bg-danger': false
  };

  constructor() {
    this.mqtt =  new Paho.MQTT.Client(this.host, 'clientId-5T9d1kSD1e');

    this.mqtt.onConnectionLost = (responseObject: Object) => {
      console.log('Connection lost.');
    };

    this.mqtt.onMessageArrived = (message: Paho.MQTT.Message) => {
      console.log(message.payloadString, message.destinationName);
      if (message.destinationName === 'wastebin/latitude') {
        this.lat = parseFloat(message.payloadString);
      }
      if (message.destinationName === 'wastebin/longitude') {
        this.lng = parseFloat(message.payloadString);
      }
      if (message.destinationName === 'wastebin/percent') {
        this.percent = parseInt(message.payloadString);

        this.barClass = {
          'bg-sucess': this.percent <= 80,
          'bg-danger': this.percent > 80
        }
      }
    };

    console.log(`connecting to ${this.host}`);

    this.mqtt.connect({ onSuccess: this.onConnect.bind(this)});
  }

  ngOnInit() {
  }

  onConnect() {
    console.log('connected');


    this.mqtt.subscribe('wastebin/latitude');
    this.mqtt.subscribe('wastebin/longitude');
    this.mqtt.subscribe('wastebin/percent');
  }

  mqttConnect() {

    this.mqtt.onMessageArrived = (message: Paho.MQTT.Message) => {
    };

    const options = {
      onSuccess: this.onConnect
    };
    this.mqtt.connect(options);
  }

}
