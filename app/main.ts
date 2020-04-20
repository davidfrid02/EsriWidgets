import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import LayerList from "esri/widgets/LayerList";
import GWTree from "./GWTree/GWTree";

declare global {
  interface Window {
    Wonderland: { view: any };
  }
}

const map = new EsriMap({
  basemap: "streets",
});

const view = new MapView({
  map: map,
  container: "viewDiv",
  center: [-118.244, 34.052],
  zoom: 12,
});



var layerList = new LayerList({
  view: view
});
view.ui.add(layerList, {
  position: "top-left"
});
let gwtree = new GWTree({
  view: view,
  showChildren: false,
});

view.ui.add(gwtree, "top-left");

window.Wonderland = {
  view: view,
};
