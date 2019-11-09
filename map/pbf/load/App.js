import axios from 'axios';
import geobuf from 'geobuf';
import Pbf from 'pbf';
import ProtoBuf from 'pbf';
import request from '../../../src/net/request';
import template from '../../../src/string/template';
import getTimeLabel from '../../../src/console/getTimeLabel';
import { expandedLog, stringify } from '../../../src/console/expandedLog';
import { VectorTile } from '@mapbox/vector-tile';

/**
 * 아래 주소의 pbf를 코만도의 스타일을 직접 내려받아서 파싱한 것과 오존의 것을 받아서 확인 합니다.
 * https://map.naver.com/v5/?c=14149672.7378817,4491199.7219950,15,0,0,0,dh
 * 그리고 받고 파싱하는 비용 개산을 합니다.
 */
const xyz = {x: 27953, y: 12711, z: 15};
const urls = {
  bus: 'https://map.pstatic.net/nvb/wmts/bus/d2e364c9-b75e-4fd7-8020-c4b26f82b9ce/getTile/{x}/{y}/{z}/pbf',
  poi_web: 'https://map.pstatic.net/nvb/wmts/poi_web/8fe6883e-5525-45f8-8f55-5e30bc4981f1/getTile/{x}/{y}/{z}/pbf',
  poi4osm: 'https://map.pstatic.net/nvbpc/wmts/osm_naver_poi/5653e757-9bf1-4a2e-b20f-86bb4c0b9912/getTile/{x}/{y}/{z}/pbf',
  cctv: 'https://map.pstatic.net/nvbpc/wmts/cctv/ab50b26c-842d-4be5-8b0c-46019f5e79a1/getTile/{x}/{y}/{z}/pbf',
  ozone: 'https://map.pstatic.net/ozone/pbf/geojson/POI?x=27953&y=12711&z=15&name=osm_naver_poi&versionCode=5653e757-9bf1-4a2e-b20f-86bb4c0b9912&pixelRatio=2&imageType=sprite&language=ko&mapType=NORMAL&quality=normal'
};

for (const prop in urls) {
  urls[prop] = template(urls[prop], xyz);
}

export default class App {
  constructor() {
    this.testPbf(urls.poi_web, 'poi_web');
  }

  loadBus() {
    // const pbf = new Pbf(new Uint8Array(response));
    // const tile = new VectorTile(pbf);
    // const tile = new VectorTile(new ProtoBuf(buffer));
  }

  testPbf(url, timeLabel) {
    console.time(getTimeLabel(`${timeLabel} 로드`));
    request({
      url,
      responseType: 'arraybuffer',
    }).then(buffer => {
      console.timeEnd(getTimeLabel(`${timeLabel} 로드`));
      console.time(getTimeLabel(`${timeLabel} pbf 파싱`));
      const tile = new VectorTile(new ProtoBuf(buffer));
      console.timeEnd(getTimeLabel(`${timeLabel} pbf 파싱`));
      // console.log(stringify(tile, 2));
      console.time(getTimeLabel(`${timeLabel} 피쳐 생성`));
      const collection = this.getFeatures(tile);
      console.timeEnd(getTimeLabel(`${timeLabel} 피쳐 생성`));
      console.log('features', collection.features);
    });
  }

  getFeatures(tile) {
    let collection = {
      type: 'FeatureCollection',
      features: []
    };

    let layers = Object.keys(tile.layers);

    if (!Array.isArray(layers)) {
      layers = [layers];
    }

    layers.forEach((layerID) => {
      const layer = tile.layers[layerID];

      const len = layer.length;
      for (let i = 0; i < len; i++) {

        const feature = {
          ...layer.feature(i).toGeoJSON(xyz.x, xyz.y, xyz.z)
        };

        if (len > 0) {
          feature.properties.layer = layerID;
        }

        console.log('feature', feature);
        collection.features.push(feature);
      }
    });

    return collection;
  }

  resize() {
  }
}
