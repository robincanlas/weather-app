import * as React from 'react';
import * as style from './style.css';
import { DivIcon, Marker } from 'leaflet';
import { connect } from 'react-redux';
import { RootState } from 'app/stores';
import { Country } from 'app/models';

export namespace _WindyMap {
  export interface Props {
    country?: Country.Model | null;
  }
  
  export interface State {
  }
}

export const _WindyMap: React.FC<_WindyMap.Props> = ({
  country = null
}: _WindyMap.Props) => {
  const [windyMap, setWindyMap] = React.useState<any>(null);
  const indexPkg: any = window; 
  const windyApiKey: string = 'ocVsUGWwD1Ansc7fZYLYZaTJg6eBssHf';
  const options = {
    key: windyApiKey, 
    // Put additional console output
    verbose: false,
    // Optional: Initial state of the map
    lat: 14.40,
    lon: 121.03,
    zoom: 5,
    latlon: true
  };
  
  const dotAnimated = `${style['pulsating-icon']} ${style.repeat}`;
  let radarMarker: Marker | null = null;

  const windyInit = (windyAPI: any) => {
    // windyAPI is ready, and contain 'map', 'store',
    // 'picker' and other usefull stuff

    const { map } = windyAPI;
    setWindyMap(map);

    // setTimeout(() => {
    //   picker.open({ 
    //     lat: 40.68295,
    //     lon: -73.9708, 
    //   });
    // }, 3000);

    const windyLogo: HTMLElement | null = document.getElementById('logo-wrapper');
    const accumulations: HTMLElement | null = document.getElementById('accumulations');
    if (windyLogo) {
      windyLogo.style.display = 'none';
    }

    if (accumulations) {
      accumulations.style.display = 'none';
    }
  };

  const addRadarMarker = (lat: number, lng: number) => {
    const divIcon: DivIcon = indexPkg.L.divIcon(
      {
        iconSize: [10, 10],
        className: `${style['icon-dot']}`,
        html: `<div class="${dotAnimated}"></div>`
      });

    if (radarMarker) {
      windyMap.removeLayer(radarMarker);
    }

    radarMarker = indexPkg.L.marker([lat, lng], {
      icon: divIcon
    });
    windyMap.addLayer(radarMarker);
  };

  React.useEffect(() => {	
    if (windyMap) {
      // addRadarMarker(7.07306, 125.61278);
      windyMap.on('click', (e: any) => {
        const lat: number = e.latlng.lat;
        const lng: number = e.latlng.lng;
        console.log(e);
        addRadarMarker(lat, lng);
      });
    }
  }, [windyMap]);

  React.useEffect(() => {
    if (windyMap) {
      if (country) {
        let lat = country.latitude;
        let lng = country.longitude;
        windyMap
          .panTo([lat, lng] , { animate: true, duration: 0.5 });

        setTimeout(() => {
          indexPkg.L.popup({ autoPan: true, className: style.popup })
          .setLatLng([lat, lng])
          .setContent(`
          <div class='${style['popup-name']}'>${country.name}</div>
          <div>${country.country}, ${country.country_code}</div>
          <div>${country.continent}</div>
          <div>Lat: ${country.latitude}</div>
          <div>Long: ${country.longitude}</div>
          `)
          .openOn(windyMap);
        }, 1500);
      }
    }
  }, [windyMap, country]);

  React.useEffect(() => {
    indexPkg.windyInit(options, windyInit);
  }, []);

  return <div id='windy' className={style.windy} />;
};

const mapStateToProps = (state: RootState): Pick<_WindyMap.Props, 'country'> => {
  return {
    country: state.country.country,
  };
};

export const WindyMap: React.FC<_WindyMap.Props> = connect(
  mapStateToProps,
  null
)(_WindyMap);