export default class App {


    constructor() {
        console.log('App');

        this.initialize();
        this.load();
    }

    initialize() {

    }

    load() {
        // parse a pbf file in a browser after an ajax request with responseType="arraybuffer"
        // var pbf = new Pbf(new Uint8Array(xhr.response));
    }

    resize() {}
}