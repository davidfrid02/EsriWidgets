/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

// pure js class for tree (this one is without jquery)
// https://github.com/vakata/jstree/tree/v.4.0

// react tree
// https://github.com/react-component/tree
// https://github.com/jakezatecky/react-checkbox-tree
// https://github.com/naisutech/react-tree


import {
  subclass,
  declared,
  property
} from "esri/core/accessorSupport/decorators";
import Widget = require("esri/widgets/Widget");
import watchUtils = require("esri/core/watchUtils");

import { renderable, tsx } from "esri/widgets/support/widget";

import MapView = require("esri/views/MapView");
import SceneView = require("esri/views/SceneView");
import GroupLayer = require("esri/layers/GroupLayer");
import FeatureLayer = require("esri/layers/FeatureLayer");

interface LayersState {
  groupLayer: GroupLayer;
  gwClusterLauyer : FeatureLayer;
  gwPointLayer: FeatureLayer;
  gwPolylineLayer: FeatureLayer;
  gwPolygonLayer: FeatureLayer;
}

interface DivStyle {
  backgroundColor: string;
  padding: string;
  borderRadius: string;
}

const CSS = {
  base: "gwTree-widget"
};

@subclass("widgets.GWTree")
class GWTree extends declared(Widget) {
  constructor() {
    super();
    this._onViewLoad = this._onViewLoad.bind(this);
  }

  postInitialize() {
    this._onViewLoad();
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
  showChildren = true;

  //-------------------------------------------------------------------
  //
  //  Public methods
  //
  //-------------------------------------------------------------------

  render() {
    const styles: DivStyle = {
      backgroundColor: "white",
      padding: "30px 30px",
      borderRadius: "25px"
    };

    return (
      <div
        bind={this}
        class={CSS.base}
        styles={styles}
        onclick={this._changeListMode}
      >
        <div>GWTREE Widget</div>
      </div>
    );
  }

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
  }

  _createGWLayers = () => {
    let groupLayer = new GroupLayer({
      title: "GWLayers",
      listMode: this.showChildren ? "show" : "hide-children"
    });

    let gwClusterLayer = new FeatureLayer({
      title: "gwClusterLayer",
      fields: [
        {
          name: "ObjectID",
          alias: "ObjectID",
          type: "oid"
        },
        {
          name: "type",
          alias: "Type",
          type: "string"
        },
        {
          name: "place",
          alias: "Place",
          type: "string"
        }
      ],
      objectIdField: "ObjectID",
      geometryType: "point",
      spatialReference: { wkid: 4326 },
      source: []
    });

    let gwPointLayer = new FeatureLayer({
      title: "gwPoint",
      fields: [
        {
          name: "ObjectID",
          alias: "ObjectID",
          type: "oid"
        },
        {
          name: "type",
          alias: "Type",
          type: "string"
        },
        {
          name: "place",
          alias: "Place",
          type: "string"
        }
      ],
      objectIdField: "ObjectID",
      geometryType: "point",
      spatialReference: { wkid: 4326 },
      source: []
    });

    let gwPolygonLayer = new FeatureLayer({
      title: "gwPolygon",
      fields: [
        {
          name: "ObjectID",
          alias: "ObjectID",
          type: "oid"
        },
        {
          name: "type",
          alias: "Type",
          type: "string"
        },
        {
          name: "place",
          alias: "Place",
          type: "string"
        }
      ],
      objectIdField: "ObjectID",
      geometryType: "polygon",
      spatialReference: { wkid: 4326 },
      source: []
    });

    let gwPolylineLayer = new FeatureLayer({
      title: "gwPolyline",
      fields: [
        {
          name: "ObjectID",
          alias: "ObjectID",
          type: "oid"
        },
        {
          name: "type",
          alias: "Type",
          type: "string"
        },
        {
          name: "place",
          alias: "Place",
          type: "string"
        }
      ],
      objectIdField: "ObjectID",
      geometryType: "polyline",
      spatialReference: { wkid: 4326 },
      source: []
    });

    groupLayer.addMany([gwClusterLayer, gwPointLayer, gwPolygonLayer, gwPolylineLayer]);

    this.layersState = {
      groupLayer: groupLayer,
      gwClusterLauyer : gwClusterLayer,
      gwPointLayer: gwPointLayer,
      gwPolygonLayer: gwPolygonLayer,
      gwPolylineLayer: gwPolylineLayer
    };
    this.view.map.add(groupLayer);
  };

  _onViewLoad = () => {
    this._createGWLayers();
  };
}

export = GWTree;
