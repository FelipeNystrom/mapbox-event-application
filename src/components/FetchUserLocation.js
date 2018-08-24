import { Component } from 'react';
import { testApiKey } from '../config';

class FetchUserLocation extends Component {
  componentDidMount() {
    this.getUserLocation();
  }

  getUserLocation = () => {
    fetch(`https://ipinfo.io?token=${testApiKey}`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
      }
    })
      .then(res => res.json())
      .then(visitorData => visitorData.loc)
      .then(loc => {
        console.log(loc);
        return loc.split(',');
      })
      .then(strings => strings.map(string => parseFloat(string)))
      .then(coordinates => {
        console.log(coordinates);
        this.props.userLoc(coordinates[1], coordinates[0]);
      });
  };
  render() {
    return null;
  }
}

export default FetchUserLocation;
