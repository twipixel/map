const ff = require('@mapbox/mapbox-gl-style-spec').featureFilter;

/**
 * Mapbox Feature Filter 테스트
 * https://github.com/mapbox/mapbox-gl-js/blob/master/src/style-spec/feature_filter/README.md
 */
export default class App {
  constructor() {
    console.log('sampleFilterTest', this.sampleFilterTest());
  }

  sampleFilterTest() {
    // will match a feature with class of street_limited,
    // AND an admin_level less than or equal to 3,
    // that's NOT a polygon.
    const filter = [
      "all",
      ["==", "class", "street_limited"],
      ["<=", "admin_level", 3],
      ["!=", "$type", "Polygon"]
    ];

    // will match a feature that has a class of
    // wetland OR wetland_noveg.
    // ["in", "class", "wetland", "wetland_noveg"]

    // testFilter will be a function that returns a boolean
    const testFilter = ff(filter);

    // Layer feature that you're testing. Must have type
    // and properties keys.
    const feature = {
      type: 2,
      properties: {
        class: "street_limited",
        admin_level: 1
      }
    };

    // will return a boolean based on whether the feature matched the filter
    return testFilter({zoom: 0}, feature);
  }

  resize() {
  }
}
