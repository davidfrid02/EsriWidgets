var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/Map", "esri/views/MapView", "esri/widgets/LayerList", "./GWTree/GWTree"], function (require, exports, Map_1, MapView_1, LayerList_1, GWTree_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Map_1 = __importDefault(Map_1);
    MapView_1 = __importDefault(MapView_1);
    LayerList_1 = __importDefault(LayerList_1);
    GWTree_1 = __importDefault(GWTree_1);
    var map = new Map_1.default({
        basemap: "streets",
    });
    var view = new MapView_1.default({
        map: map,
        container: "viewDiv",
        center: [-118.244, 34.052],
        zoom: 12,
    });
    var layerList = new LayerList_1.default({
        view: view
    });
    view.ui.add(layerList, {
        position: "top-left"
    });
    var gwtree = new GWTree_1.default({
        view: view,
        showChildren: false,
    });
    view.ui.add(gwtree, "top-left");
    window.Wonderland = {
        view: view,
    };
});
//# sourceMappingURL=main.js.map