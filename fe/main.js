import 'ol/ol.css';
import Circle from 'ol/geom/Circle';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import View from 'ol/View';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';

const circle_image_default = new CircleStyle({
  radius: 3,
  fill: null,
  stroke: new Stroke({color: 'white', width: 1}),
});

const circle_image_red = new CircleStyle({
  radius: 3,
  fill: null,
  stroke: new Stroke({color: 'red', width: 1}),
});

const circle_image_green = new CircleStyle({
  radius: 3,
  fill: null,
  stroke: new Stroke({color: 'green', width: 1}),
});

const circle_image_yellow = new CircleStyle({
  radius: 3,
  fill: null,
  stroke: new Stroke({color: 'yellow', width: 1}),
});

// GeoJSON object templates as styles
// color of style based on data requested
const styles = {
  'Point': new Style({
    image: circle_image_red,
  }),
  'LineString': new Style({
    stroke: new Stroke({
      color: 'green',
      width: 1,
    }),
  }),
  'MultiLineString': new Style({
    stroke: new Stroke({
      color: 'green',
      width: 1,
    }),
  }),
  'MultiPoint': new Style({
    image: circle_image_green,
  }),
  'MultiPolygon': new Style({
    stroke: new Stroke({
      color: 'yellow',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(255, 255, 0, 0.1)',
    }),
  }),
  'Polygon': new Style({
    stroke: new Stroke({
      color: 'blue',
      lineDash: [4],
      width: 3,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
  }),
  'GeometryCollection': new Style({
    stroke: new Stroke({
      color: 'magenta',
      width: 2,
    }),
    fill: new Fill({
      color: 'magenta',
    }),
    image: new CircleStyle({
      radius: 10,
      fill: null,
      stroke: new Stroke({
        color: 'magenta',
      }),
    }),
  }),
  'Circle': new Style({
    stroke: new Stroke({
      color: 'red',
      width: 2,
    }),
    fill: new Fill({
      color: 'rgba(255,0,0,0.2)',
    }),
  }),
};

// container for GeoJSON object templates
const styleFunction = function (feature) {
  return styles[feature.getGeometry().getType()];
};

// TODO: Create an empty geojson object so populate with requested data
var requestedGeoJSON = {
  'type': 'FeatureCollection',
  'crs': {
    'type': 'name',
    'properties': {
      'name': 'EPSG:3857',
    },
  },
  'features': [
    {
      'type': 'Feature',
      'geometry': {
        'type': 'GeometryCollection',
        'geometries': [
          {
            'type': 'LineString',
            'coordinates': [
              [-5e6, -5e6],
              [0, -5e6],
            ],
          },
          {
            'type': 'Point',
            'coordinates': [4e6, -5e6],
          },
          {
            'type': 'Polygon',
            'coordinates': [
              [
                [1e6, -6e6],
                [3e6, -6e6],
                [2e6, -4e6],
                [1e6, -6e6],
              ],
            ],
          },
        ],
      },
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'GeometryCollection',
        'geometries': [
          {
            'type': 'LineString',
            'coordinates': [
              [0, -1e6],
              [-1e6, 0],
            ],
          },
          {
            'type': 'Point',
            'coordinates': [3, 3],
          },
          {
            'type': 'Polygon',
            'coordinates': [
              [
                [5, -5],
                [3e6, -6e6],
                [2e6, -4e6],
                [1e6, -6e6],
              ],
            ],
          },
        ],
      },
    }
  ]
};

// geojson data to render as vector
const geojsonObject = {
  'type': 'FeatureCollection',
  'crs': {
    'type': 'name',
    'properties': {
      'name': 'EPSG:3857',
    },
  },
  'features': [
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [0, 0]
      },
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [4e6, -2e6],
          [8e6, 2e6],
        ],
      },
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [4e6, 2e6],
          [8e6, -2e6],
        ],
      },
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Polygon',
        'coordinates': [
          [
            [-5e6, -1e6],
            [-3e6, -1e6],
            [-4e6, 1e6],
            [-5e6, -1e6],
          ],
        ],
      },
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'MultiLineString',
        'coordinates': [
          [
            [-1e6, -7.5e5],
            [-1e6, 7.5e5],
          ],
          [
            [1e6, -7.5e5],
            [1e6, 7.5e5],
          ],
          [
            [-7.5e5, -1e6],
            [7.5e5, -1e6],
          ],
          [
            [-7.5e5, 1e6],
            [7.5e5, 1e6],
          ],
        ],
      },
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'MultiPolygon',
        'coordinates': [
          [
            [
              [-5e6, 6e6],
              [-3e6, 6e6],
              [-3e6, 8e6],
              [-5e6, 8e6],
              [-5e6, 6e6],
            ],
          ],
          [
            [
              [-2e6, 6e6],
              [0, 6e6],
              [0, 8e6],
              [-2e6, 8e6],
              [-2e6, 6e6],
            ],
          ],
          [
            [
              [1e6, 6e6],
              [3e6, 6e6],
              [3e6, 8e6],
              [1e6, 8e6],
              [1e6, 6e6],
            ],
          ],
        ],
      },
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'GeometryCollection',
        'geometries': [
          {
            'type': 'LineString',
            'coordinates': [
              [-5e6, -5e6],
              [0, -5e6],
            ],
          },
          {
            'type': 'Point',
            'coordinates': [4e6, -5e6],
          },
          {
            'type': 'Polygon',
            'coordinates': [
              [
                [1e6, -6e6],
                [3e6, -6e6],
                [2e6, -4e6],
                [1e6, -6e6],
              ],
            ],
          },
        ],
      },
    },
  ],
};

// converts the geojson objects to the vector source
const vectorSource = new VectorSource({
  features: new GeoJSON().readFeatures(geojsonObject/*requestedGeoJSON*/),
});

// adds a vector feature hard coded
vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)));

// applies the vectors from the source to the layer to render
const vectorLayer = new VectorLayer({
  source: vectorSource,    // source to pull vectors from
  style: styleFunction,    // geojson styles to use
});

// map object to render to the client-side including vector data
const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),// remote data for layer
    }),
    vectorLayer,        // vectors to render
  ],
  target: 'map',        // id to be found client-side
  view: new View({      // the view of the map
    center: [0, 0],     // what is the center point
    zoom: 1,            // initial zoom level
  }),
});

