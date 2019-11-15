export default class App {
    constructor() {
        this.initialize();
        this.createMap();
    }

    initialize() {

    }

    createMap() {
        var key = 'pk.eyJ1IjoidHdpcGl4ZWwiLCJhIjoiY2poeDR4d2JjMDR4cjNsbnlyYjJidHRraSJ9.N9l0f9XKLw7tFAAuSWTgTA';

        var map = new ol.Map({
            layers: [
                new ol.layer.VectorTile({
                    declutter: true,
                    source: new ol.source.VectorTile({
                        attributions: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> ' +
                        '© <a href="https://www.openstreetmap.org/copyright">' +
                        'OpenStreetMap contributors</a>',
                        format: new ol.format.MVT(),
                        url: 'https://{a-d}.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6/' +
                        '{z}/{x}/{y}.vector.pbf?access_token=' + key
                    }),
                    style: createMapboxStreetsV6Style(ol.style.Style, ol.style.Fill, ol.style.Stroke, ol.style.Icon, ol.style.Text)
                })
            ],
            target: 'map',
            view: new ol.View({
                center: [0, 0],
                zoom: 2
            })
        });
    }

    resize() {
    }
}