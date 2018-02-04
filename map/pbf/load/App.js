export default class App {


    constructor() {
        this.initialize();
        this.loadPbf();
        this.loadVector();
    }

    initialize() {

    }

    loadPbf() {
        this.load(
            'countries/0/0/0.pbf',
            (xhttp) => {
                const pbf = new Pbf(new Uint8Array(xhttp.response));
                // const tile = new VectorTile(pbf);
                console.log('pbf', pbf);
                // console.log('tile', tile);
            },
            (xhttp) => {
                console.log(xhttp.statusText);
            }
        );
    }

    loadVector() {
        this.load(
            'https://tile.mapzen.com/mapzen/vector/v1/all/13/1308/3165.mvt?api_key=vector-tiles-LM25tq4',
            // 'https://tile.mapzen.com/mapzen/vector/v1/all/13/1309/3165.mvt?api_key=vector-tiles-LM25tq4',
            // 'https://tile.mapzen.com/mapzen/vector/v1/all/13/1310/3165.mvt?api_key=vector-tiles-LM25tq4',
            // 'https://tile.mapzen.com/mapzen/vector/v1/all/13/1311/3165.mvt?api_key=vector-tiles-LM25tq4',
            // 'https://tile.mapzen.com/mapzen/vector/v1/all/13/1308/3166.mvt?api_key=vector-tiles-LM25tq4',
            // 'https://tile.mapzen.com/mapzen/vector/v1/all/13/1309/3166.mvt?api_key=vector-tiles-LM25tq4',
            // 'https://tile.mapzen.com/mapzen/vector/v1/all/13/1310/3166.mvt?api_key=vector-tiles-LM25tq4',
            // 'https://tile.mapzen.com/mapzen/vector/v1/all/13/1311/3166.mvt?api_key=vector-tiles-LM25tq4',
            // 'https://tile.mapzen.com/mapzen/vector/v1/all/13/1308/3167.mvt?api_key=vector-tiles-LM25tq4',
            // 'https://tile.mapzen.com/mapzen/vector/v1/all/13/1309/3167.mvt?api_key=vector-tiles-LM25tq4',
            (xhttp) => {
                const pbf = new Pbf(new Uint8Array(xhttp.response));
                const tile = new VectorTile(pbf);
                console.log('pbf', pbf);
                console.log('tile', tile);

                const zoom = 10;
                const layers = ['water', 'landuse', 'roads', 'buildings'];

                const data = {};
                for (let key in tile.layers) {
                    data[key] = tile.layers[key].toGeoJSON();
                }

                const features = [];

                layers.forEach(
                    (layer) => {
                        if (data[layer]) {
                            for (let i in data[layer].features) {
                                // Don't include any label placement points
                                if (data[layer].features[i].properties.label_placement) { continue }

                                // Don't show large buildings at z13 or below.
                                if (zoom <= 13 && layer == 'buildings') { continue }

                                // Don't show small buildings at z14 or below.
                                if (zoom <= 14 && layer == 'buildings' && data[layer].features[i].properties.area < 2000) { continue }

                                data[layer].features[i].layer_name = layer;
                                features.push(data[layer].features[i]);
                            }
                        }
                    }
                );

                console.log('data', data);
                console.log('features', features);
            }
        );
    }

    load(url, success = null, error = null) {
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', url);
        xhttp.responseType = 'arraybuffer';
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                if (success) {
                    success.call(null, xhttp);
                }
            }
        };
        xhttp.onerror = () => {
            if (error) {
                error.call(null, xhttp);
            }
        };
        xhttp.send();
    }

    resize() {
    }
}