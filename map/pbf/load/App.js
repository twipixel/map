import axios from 'axios';
import geobuf from 'geobuf';
import Pbf from 'pbf';
import ProtoBuf from 'pbf';
import { VectorTile } from '@mapbox/vector-tile';

const xyz = {x: 27953, y: 12711, z: 15};
const bus = 'https://map.pstatic.net/nvb/wmts/bus/d2e364c9-b75e-4fd7-8020-c4b26f82b9ce/getTile/27953/12711/15/pbf';
const poi_web = 'https://map.pstatic.net/nvb/wmts/poi_web/8fe6883e-5525-45f8-8f55-5e30bc4981f1/getTile/27953/12711/15/pbf';

export default class App {
  constructor() {
    this.loadVector();
  }

  loadVector() {
    this.load({
      url: poi_web,
      responseType: 'arraybuffer',
    }).then(buffer => {
      // const pbf = new Pbf(new Uint8Array(response));
      // const tile = new VectorTile(pbf);
      const tile = new VectorTile(new ProtoBuf(buffer));
      console.log('tile', tile);

      const collection = this.getFeatures(tile);
      console.log('features', collection.features);
    });
  }

  load({url, responseType = 'json'}) {
    const fetchData = () => {
      return axios({
        url,
        responseType,
      }).then(({data}) => {
        return data;
      });
    };
    return fetchData();
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

        collection.features.push(feature);
      }
    });

    return collection;
  }

  resize() {
  }
}