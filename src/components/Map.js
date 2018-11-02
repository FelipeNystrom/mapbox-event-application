import React, { Component, Fragment } from 'react';
import mapboxgl from 'mapbox-gl';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import userSymbol from './Ripple-2.1s-200px.gif';
// import FetchUserLocation from './FetchUserLocation';

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2hha2thdGFsIiwiYSI6ImNqa2w4ZWIxbzAzcHQzcm1uenV3MG80OXIifQ.CY7fw2afzHzfcyCJzZvVhg';

class Map extends Component {
  state = {
    zoom: 13,
    latitude: 18.05,
    longitude: 59.3333,
    bearing: 20,
    pitch: 0
  };
  componentDidMount() {
    const { zoom, latitude, longitude, bearing, pitch } = this.state;
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      zoom: zoom,
      pitch: pitch,
      bearing: bearing,
      interactive: true,
      style: 'mapbox://styles/shakkatal/cjl8dk3mx02uj2sqrkpb2saqw',
      center: [latitude, longitude]
    });

    this.map.on('move', () => {
      const { lng, lat } = this.map.getCenter();

      this.setState({
        longitude: lng.toFixed(4),
        latitude: lat.toFixed(4),
        zoom: this.map.getZoom().toFixed(2)
      });
    });

    this.map.on('load', function() {
      this.map.loadImage('./Ripple-2.1s-200px.gif', (error, image) => {
        if (error) throw error;
        this.map.addImage('user', image);
        this.map.addLayer({
          id: 'points',
          type: 'symbol',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [this.state.latitude, this.state.longitude]
                  }
                }
              ]
            }
          },
          layout: {
            'icon-image': 'user',
            'icon-size': 0.25
          }
        });
      });
    });

    // this.map.addControl(
    //   new MapboxGeocoder({
    //     accessToken: mapboxgl.accessToken,
    //     country: 'se'
    //   })
    // );

    // // Add zoom and rotation controls to the map.
    // this.map.addControl(new mapboxgl.NavigationControl());

    // // Add geolocate control to the map.
    // this.map.addControl(
    //   new mapboxgl.GeolocateControl({
    //     positionOptions: {
    //       enableHighAccuracy: true
    //     },
    //     trackUserLocation: true
    //   })
    // );

    // Add user symbol at map load
    // this.map.on('load', () => {
    //   this.map.loadImage(userSymbol, (error, image) => {
    //     if (error) throw error;
    //     this.map.addImage('userIcon', image);
    //     this.map.addLayer({
    //       id: 'user',
    //       type: 'symbol',
    //       source: {
    //         type: 'geojson',
    //         data: {
    //           type: 'FeatureCollection',
    //           features: [
    //             {
    //               type: 'Feature',
    //               geometry: {
    //                 type: 'Point',
    //                 coordinates: [18.05, 59.3333]
    //               }
    //             }
    //           ]
    //         }
    //       },
    //       layout: {
    //         'icon-image': 'user',
    //         'icon-size': 0.1
    //       }
    //     });
    //   });
    // });
  }
  componentWillUnmount() {
    this.map.remove();
  }

  // componentDidUpdate(prevState) {
  //   console.log('update');
  //   this.map = new mapboxgl.Map({
  //     container: this.mapContainer,
  //     style: 'mapbox://styles/mapbox/streets-v9',
  //     zoom: 13,
  //     pitch: 60,
  //     bearing: -10,
  //     center: [this.state.latitude, this.state.longitude]
  //   });
  // }

  userLoc = (latitude, longitude) => {
    console.log(latitude);
    console.log(longitude);
    this.setState({
      latitude: latitude,
      longitude: longitude
    });
  };

  handleZoom = e => {
    e.preventDefault();
    console.log(e.target.value);
    if (e.target.value === '+') {
      this.setState({ zoom: this.state.zoom + 1 });
    } else if (e.target.value === '-') {
      this.setState({ zoom: this.state.zoom - 1 });
    }
  };

  render() {
    const mapStyle = {
      // position: 'relative',
      height: '100vh',
      width: '100vw'
    };

    return (
      <Fragment>
        {/* <FetchUserLocation userLoc={this.userLoc} /> */}
        <div style={mapStyle} ref={el => (this.mapContainer = el)} />
      </Fragment>
    );
  }
}

export default Map;
