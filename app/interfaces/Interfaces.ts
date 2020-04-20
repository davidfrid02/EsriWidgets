import Extent from "esri/geometry/Extent";
import GroupLayer from "esri/layers/GroupLayer";
import FeatureLayer from "esri/layers/FeatureLayer";

export interface DivStyle {
  backgroundColor: string;
  padding: string;
  borderRadius: string;
}

export interface LayersState {
  groupLayer: GroupLayer;
  gwClusterLauyer: FeatureLayer;
  gwPointLayer: FeatureLayer;
  gwPolylineLayer: FeatureLayer;
  gwPolygonLayer: FeatureLayer;
}

export interface MapState {
  interacting: boolean;
  scale: number;
  extent: Extent;
}