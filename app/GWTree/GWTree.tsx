/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import {
  subclass,
  declared,
  property,
} from "esri/core/accessorSupport/decorators";
import Widget from "esri/widgets/Widget";
import { renderable, tsx } from "esri/widgets/support/widget";
import MapView from "esri/views/MapView";
import SceneView from "esri/views/SceneView";
import GroupLayer from "esri/layers/GroupLayer";
import FeatureLayer from "esri/layers/FeatureLayer";
import Expand from "esri/widgets/Expand";
import { MapState, DivStyle, LayersState } from "../interfaces/Interfaces";

import VanillaTree from "vanillatree";

import layerConfig from "./LayersConfig";

const CSS = {
  base: "gwTree-widget",
};

@subclass("widgets.GWTree")
class GWTree extends declared(Widget) {
  constructor() {
    super();
    this._onViewChange = this._onViewChange.bind(this);
  }

  postInitialize() {
    this.GWTree();
  }

  GWTree() {
    //get tree data
    this._getGWTreeData();
    //Initialize GWtree element
    this._initGWTree();
    //Create the GWTree
    this._createGWTree();
  }

  //----------------------------------
  //  Properties
  //----------------------------------

  @property()
  @renderable()
  view: MapView | SceneView;

  @property()
  @renderable()
  layersState: LayersState;

  @property()
  @renderable()
  mapState: MapState;

  @property()
  @renderable()
  showChildren = true;

  @property()
  @renderable()
  expand: Expand;

  @property()
  @renderable()
  GWTreeObj: any;

  //-------------------------------------------------------------------
  //
  //  Public methods
  //
  //-------------------------------------------------------------------

  _getGWTreeData = () => {
    //i built a nodejs server to get data, 
    // fetch("http://localhost:3000/", {
    //   mode: "cors",
    // })
    //   .then((response) => response.json())
    //   .then(function (data) {
    //     console.log(data);
    //   })
    //   .catch(function (error) {
    //     console.log("Request failed", error);
    //   });

    // ========= TZUR ==========
    //For now just read the GWData.json file !!!
    // =========================
    //and build the tree!
  };

  _createGWTree = () => {
    const tree = new VanillaTree("#GWtree", {
      contextmenu: [
        {
          label: "Hey",
          action: function (id: any) {
            alert("Hey " + id);
          },
        },
        {
          label: "Blah",
          action: function (id: any) {
            alert("Blah " + id);
          },
        },
      ],
    });

    tree.add({
      label: "Label A",
      id: "a",
      opened: true,
    });

    tree.add({
      label: "Label B",
      id: "b",
    });

    tree.add({
      label: "Label A.A",
      parent: "a",
      id: "a.a",
      opened: true,
      selected: true,
    });

    tree.add({
      label: "Label A.A.A",
      parent: "a.a",
    });

    tree.add({
      label: "Label A.A.B",
      parent: "a.a",
    });

    tree.add({
      label: "Label B.A",
      parent: "b",
    });

    this.GWTreeObj.addEventListener("vtree-open", (event: any) => {
      //TODO add to layer
      console.log(event.detail.id + " is opened");
    });

    this.GWTreeObj.addEventListener("vtree-close", (event: any) => {
      //TODO add to layer
      console.log(event.detail.id + " is opened");
    });

    this.GWTreeObj.addEventListener("vtree-select", (event: any) => {
      //TODO add to layer
      console.log(event.detail.id + " is opened");
    });

    this._createGWLayers();
  };

  render() {
    const styles: DivStyle = {
      backgroundColor: "white",
      padding: "30px 30px",
      borderRadius: "25px",
    };

    return "";
  }

  _initGWTree = () => {
    this.GWTreeObj = document.createElement("div");
    this.GWTreeObj.id = "GWtree";

    const expandContainer = document.createElement("div");
    expandContainer.onclick = () => {
      this._changeListMode();
    };

    this.expand = new Expand({
      view: this.view,
      expandIconClass: "esri-icon-applications",
      content: this.GWTreeObj,
      container: expandContainer,
      id: "gwTree",
    });
    this.view.ui.add(this.expand, "top-left");
    const expandElement = document.getElementById("gwTree_controls_content");
    expandElement.style.backgroundColor = "#fff";
    expandElement.style.borderRadius = "7px";
  };

  //-------------------------------------------------------------------
  //
  //  Private methods
  //
  //-------------------------------------------------------------------

  _changeListMode = () => {
    if (this.layersState.groupLayer) {
      this.showChildren = !this.showChildren;
      this.layersState.groupLayer.listMode = this.showChildren
        ? "show"
        : "hide-children";
    }
  };

  _createGWLayers = () => {
    let groupLayer = new GroupLayer({
      title: "GWLayers",
      listMode: this.showChildren ? "show" : "hide-children",
    });

    let gwClusterLayer = new FeatureLayer({
      title: "gwClusterLayer",
      fields: layerConfig.getClusterField(),
      objectIdField: "ObjectID",
      geometryType: "point",
      spatialReference: { wkid: 4326 },
      source: [],
    });

    let gwPointLayer = new FeatureLayer({
      title: "gwPoint",
      fields: layerConfig.getFields(),
      objectIdField: "ObjectID",
      geometryType: "point",
      spatialReference: { wkid: 4326 },
      source: [],
    });

    let gwPolygonLayer = new FeatureLayer({
      title: "gwPolygon",
      fields: layerConfig.getFields(),
      objectIdField: "ObjectID",
      geometryType: "polygon",
      spatialReference: { wkid: 4326 },
      source: [],
    });

    let gwPolylineLayer = new FeatureLayer({
      title: "gwPolyline",
      fields: layerConfig.getFields(),
      objectIdField: "ObjectID",
      geometryType: "polyline",
      spatialReference: { wkid: 4326 },
      source: [],
    });

    groupLayer.addMany([
      gwClusterLayer,
      gwPointLayer,
      gwPolygonLayer,
      gwPolylineLayer,
    ]);

    this.layersState = {
      groupLayer: groupLayer,
      gwClusterLauyer: gwClusterLayer,
      gwPointLayer: gwPointLayer,
      gwPolygonLayer: gwPolygonLayer,
      gwPolylineLayer: gwPolylineLayer,
    };

    this.view.map.add(groupLayer);
  };

  _onViewChange = () => {
    let { interacting, scale, extent } = this.view;
    this.mapState = {
      interacting,
      scale,
      extent,
    };

    if (!interacting) {
      // query for count
      // get cluster features
      // get raw data
    }

    console.log(this.mapState);
  };
}

export = GWTree;
