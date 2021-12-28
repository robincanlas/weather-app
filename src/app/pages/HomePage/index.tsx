import * as React from 'react';
import * as style from './style.css';
import { DivIcon, Marker } from 'leaflet';
import { SearchBar } from 'app/components';

export namespace HomePage {
  export interface Props {
  }
  export interface State {
  }
}

export const HomePage: React.FC<HomePage.Props> = (props: HomePage.Props) => {
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

    // picker.open({ lat: options.lat, lon: options.lon });
    const windyLogo: HTMLElement | null = document.getElementById('logo-wrapper');
    if (windyLogo) {
      windyLogo.style.display = 'none';
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
        
        // indexPkg.L.popup()
        // 	.setLatLng([lat, lng])
        // 	.setContent(`
        // 		Latitude: ${lat}, 
        // 		Longitude ${lng}`
        // 	)
        // 	.openOn(windyMap);
      });
    }
  }, [windyMap]);

  React.useEffect(() => {
    indexPkg.windyInit(options, windyInit);
  }, []);

  return (
    <main>
      <SearchBar />
      <div id='windy' className={style.windy} />
    </main>
  );
};
