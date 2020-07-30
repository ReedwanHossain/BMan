import React, { createRef, Component } from "react";
import { connect } from 'react-redux'
import { Map, Marker, Popup } from "react-leaflet";

import MapboxLayer from "../MapboxLayer";

import { initGeo, setMarker, showDetails } from '../actions/mapAction'

import { responseBlender } from '../factory/supportFactory'


class MapComp extends Component {

  constructor(props){
    super(props);
    this.state = {
      position: {
        latitude: this.props.latlng.lat,
        longitude: this.props.latlng.lng,
        msg: 'you here'
      }
    }
  }

  setMapState = (stateData)=>{
    this.setState({position: stateData})
  }
  
  componentWillMount(){
    console.log(this.props.latlng.lat)
  }

  componentWillReceiveProps(nextProps){
    try{
      if(nextProps.selectedPlace.hasOwnProperty('geocoded_address')){
        this.setState(prevState => ({
          position: {                   // object that we want to update
              ...prevState.position,    // keep all other key-value pairs
              latitude: nextProps.selectedPlace.geocoded_address.latitude,       // update the value of specific key,
              longitude: nextProps.selectedPlace.geocoded_address.longitude,
              msg: nextProps.selectedPlace.geocoded_address.Address
          }
        }))
      }
      else if(nextProps.selectedPlace.hasOwnProperty('place')){
        if(nextProps.selectedPlace.place.hasOwnProperty('latitude')){
          this.setState(prevState => ({
            position: {                   // object that we want to update
                ...prevState.position,    // keep all other key-value pairs
                latitude: nextProps.selectedPlace.place.latitude,       // update the value of specific key,
                longitude: nextProps.selectedPlace.place.longitude,
                msg: nextProps.selectedPlace.place.address
            }
          }))
        }
        else{
          const values = [...nextProps.urlParams];
        let lat = 23.7985508, lng = 90.3654215;
        values.map((vl)=>{
          if(vl.key==='latitude')lat = vl.value;
          if(vl.key==='longitude')lng = vl.value;
        })
          this.setState(prevState => ({
            position: {                   // object that we want to update
                latitude: lat,       // update the value of specific key,
                longitude: lng,
                msg: nextProps.selectedPlace.place.address
            }
          }))
        }
      }
      else {
        this.setState(prevState => ({
          position: {                   // object that we want to update
              ...prevState.position,    // keep all other key-value pairs
              
          }
        }))
      }
    }catch(e){

    }
    
  }



  mapRef = createRef();

  handleClick = async (e) => {
    const latLng = {
      lat: e.latlng.lat,
      lng: e.latlng.lng
    };

    this.setState(prevState => ({
      position: {              
          ...prevState.position,    // keep all other key-value pairs
          latitude: e.latlng.lat,
          longitude: e.latlng.lng  

      }
    }))

   await this.props.setMarker(latLng);
    
  }

  handleLocationFound = (e) => {
    const map = this.mapRef.current
    this.props.setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    })

    if (map != null) {
      map.leafletElement.locate()
    }
  }


  render() {

    // const marker = this.props.hasLocation ? (
    //   <Marker position={{lat: this.state.position.lat, lng: this.state.position.lng }}>
    //     <Popup>{this.state.position.msg}</Popup>
    //   </Marker>
    // ) : null

    const marker = (
      <Marker position={{lat: this.state.position.latitude, lng: this.state.position.longitude }}>
        <Popup>{this.state.position.msg}</Popup>
      </Marker>)

    return (
      <div>
        <Map center={{lat: this.state.position.latitude,lng: this.state.position.longitude }} zoom={this.props.zoom} length={4}
        onClick={this.handleClick}
        onLocationfound={this.handleLocationFound}
        ref={this.mapRef}>
          <MapboxLayer />
          {this.props.selectedPlace!={} && marker}
          { this.props.suggestions.length > 0 &&
                    this.props.suggestions.map(item =>
                        <Marker position={[item.latitude, item.longitude]} key={item.id}>
                            <Popup><span>{ item.address }</span></Popup>
                        </Marker>
                    )
          }
        </Map>
      </div>
    );
  }
}

const mapStateToProps = state => ({

  latlng: state.map.latlng,
  zoom: state.map.zoom,
  responseRG: state.baseform.responseRG,
  suggestions: state.baseform.suggestions,
  selectedPlace: state.baseform.selectedPlace,
  urlParams: state.baseform.urlParams

})

const mapDispatchToProps = (dispatch) => ({
  initGeo: () => dispatch(initGeo()),
  setMarker: (location) => dispatch(setMarker(location)),
  showDetails: (place) => dispatch(showDetails(place)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapComp)