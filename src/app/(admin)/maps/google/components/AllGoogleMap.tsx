'use client'
import { GoogleMap, Marker, Polyline, StreetViewPanorama, useJsApiLoader } from '@react-google-maps/api'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import { Col, Row } from 'react-bootstrap'
import React from 'react'


const containerStyle = {
  width: '100%',
  height: '400px',
}

const center = {
  lat: -12.043333,
  lng: -77.028333,
}


const BasicMap = () => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '', // Use environment variable
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map: any) {
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback() {
    setMap(null)
  }, [])

  if (!isLoaded) {
    return <p>Loading map...</p>
  }

  return (
    <ComponentContainerCard title="Basic Google Map">
      <div id="gmaps-basic" className="gmaps " style={{ position: 'relative', overflow: 'hidden' }} >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14} 
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
        </GoogleMap>
      </div>
    </ComponentContainerCard>
  )
}


const MarkersMap = () => {

  const markers = [
    { lat: -3.745, lng: -38.523, title: 'Marker 1' },
    { lat: -3.745, lng: -38.533, title: 'Marker 2' },
    { lat: -3.735, lng: -38.523, title: 'Marker 3' },
  ]

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '', 
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map: any) {
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback() {
    setMap(null)
  }, [])

  if (!isLoaded) {
    return <p>Loading map...</p>
  }

  return (
    <ComponentContainerCard title="Markers Google Map">
      <div id="gmaps-basic" className="gmaps " style={{ position: 'relative', overflow: 'hidden' }} >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              title={marker.title}
            />
          ))}
        </GoogleMap>
      </div>
    </ComponentContainerCard>
  )
}

const StreetViewMap = () => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '', // Use your API key
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map: any) {
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback() {
    setMap(null)
  }, [])

  if (!isLoaded) {
    return <p>Loading map...</p>
  }

  return (
    <ComponentContainerCard title="Street View Panoramas Google Map">
      <div id="gmaps-basic" className="gmaps " style={{ position: 'relative', overflow: 'hidden' }} >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <StreetViewPanorama
           options={{
            position: center,
            visible: true,
            panControl: false,
            zoomControl: false,
          }}
          />
        </GoogleMap>
      </div>
    </ComponentContainerCard>
  )
}

const GoogleTypeMap = () => {
  const containerStyle = {
    width: '100%',
    height: '400px',
  }

  const center = {
    lat: 37.7749, 
    lng: -122.4194, 
  }

  // Polyline coordinates
  const polyline = [
    { lat: 37.789411, lng: -122.422116 },
    { lat: 37.785757, lng: -122.421333 },
    { lat: 37.789352, lng: -122.415346 },
  ]

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '', 
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map: any) {
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback() {
    setMap(null)
  }, [])

  if (!isLoaded) {
    return <p>Loading map...</p>
  }

  return (
    <ComponentContainerCard title="Google Map Types">
      <div id="gmaps-basic" className="gmaps" style={{ position: 'relative', overflow: 'hidden' }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
          mapTypeId={google.maps.MapTypeId.SATELLITE} 
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Polyline
          options={{
            path:polyline  ,
            strokeColor:"#0000FF",
            strokeOpacity:0.8,
            strokeWeight:2, 
          }}
          />
        </GoogleMap>
      </div>
    </ComponentContainerCard>
  )
}

const LightStyledMap = () => {

  const mapStyles = [
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#e9e9e9' }, { lightness: 17 }],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [{ color: '#f5f5f5' }, { lightness: 20 }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [{ color: '#ffffff' }, { lightness: 17 }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#ffffff' }, { lightness: 29 }, { weight: 0.2 }],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [{ color: '#ffffff' }, { lightness: 18 }],
    },
    {
      featureType: 'road.local',
      elementType: 'geometry',
      stylers: [{ color: '#ffffff' }, { lightness: 16 }],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#f5f5f5' }, { lightness: 21 }],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#dedede' }, { lightness: 21 }],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [{ visibility: 'on' }, { color: '#ffffff' }, { lightness: 16 }],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [{ saturation: 36 }, { color: '#333333' }, { lightness: 40 }],
    },
    { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#f2f2f2' }, { lightness: 19 }],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.fill',
      stylers: [{ color: '#fefefe' }, { lightness: 20 }],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#fefefe' }, { lightness: 17 }, { weight: 1.2 }],
    },
  ]

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '', 
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map: any) {
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback() {
    setMap(null)
  }, [])

  if (!isLoaded) {
    return <p>Loading map...</p>
  }

  return (
    <ComponentContainerCard title="Ultra Light with Labels">
      <div id="gmaps-basic" className="gmaps " style={{ position: 'relative', overflow: 'hidden' }} >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          options={{ 
            styles:mapStyles
          }}
          zoom={14}
          mapTypeId={google.maps.MapTypeId.SATELLITE}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
        </GoogleMap>
      </div>
    </ComponentContainerCard>
  )
}

const DarkStyledMap = () => {

  const mapStyles = [
    {
      featureType: 'all',
      elementType: 'labels',
      stylers: [{ visibility: 'on' }],
    },
    {
      featureType: 'all',
      elementType: 'labels.text.fill',
      stylers: [{ saturation: 36 }, { color: '#000000' }, { lightness: 40 }],
    },
    {
      featureType: 'all',
      elementType: 'labels.text.stroke',
      stylers: [{ visibility: 'on' }, { color: '#000000' }, { lightness: 16 }],
    },
    {
      featureType: 'all',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.fill',
      stylers: [{ color: '#000000' }, { lightness: 20 }],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#000000' }, { lightness: 17 }, { weight: 1.2 }],
    },
    {
      featureType: 'administrative.country',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#e5c163' }],
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#c4c4c4' }],
    },
    {
      featureType: 'administrative.neighborhood',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#e5c163' }],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [{ color: '#000000' }, { lightness: 20 }],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#000000' }, { lightness: 21 }, { visibility: 'on' }],
    },
    {
      featureType: 'poi.business',
      elementType: 'geometry',
      stylers: [{ visibility: 'on' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [{ color: '#e5c163' }, { lightness: '0' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#ffffff' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#e5c163' }],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [{ color: '#000000' }, { lightness: 18 }],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry.fill',
      stylers: [{ color: '#575757' }],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#ffffff' }],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#2c2c2c' }],
    },
    {
      featureType: 'road.local',
      elementType: 'geometry',
      stylers: [{ color: '#000000' }, { lightness: 16 }],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#999999' }],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#000000' }, { lightness: 19 }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#000000' }, { lightness: 17 }],
    },
  ]

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '', 
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map: any) {
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback() {
    setMap(null)
  }, [])

  if (!isLoaded) {
    return <p>Loading map...</p>
  }

  return (
    <ComponentContainerCard title="Dark">
       <div className="gmaps" style={{ position: 'relative', overflow: 'hidden' }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          options={{
            styles: mapStyles, 
          }}
          zoom={14}
          mapTypeId={google.maps.MapTypeId.SATELLITE}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
        </GoogleMap>
      </div>
    </ComponentContainerCard>
  )
}

const AllGoogleMap = () => {
  return (
    <>
      <div>
        <Row>
          <Col xl={6}>
            <BasicMap />
          </Col>
          <Col xl={6}>
            <MarkersMap />
          </Col>
        </Row>
        <Row>
          <Col xl={6}>
            <StreetViewMap />
          </Col>
          <Col xl={6}>
            <GoogleTypeMap />
          </Col>
        </Row>
      </div>
      <Row>
        <Col xl={6}>
          <LightStyledMap />
        </Col>
        <Col xl={6}>
          <DarkStyledMap />
        </Col>
      </Row>

    </>
  )
}

export default AllGoogleMap