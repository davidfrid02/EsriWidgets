/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget", "esri/layers/GroupLayer", "esri/layers/FeatureLayer", "esri/widgets/Expand", "vanillatree", "./LayersConfig"], function (require, exports, __extends, __decorate, decorators_1, Widget_1, widget_1, GroupLayer_1, FeatureLayer_1, Expand_1, vanillatree_1, LayersConfig_1) {
    "use strict";
    Widget_1 = __importDefault(Widget_1);
    GroupLayer_1 = __importDefault(GroupLayer_1);
    FeatureLayer_1 = __importDefault(FeatureLayer_1);
    Expand_1 = __importDefault(Expand_1);
    vanillatree_1 = __importDefault(vanillatree_1);
    LayersConfig_1 = __importDefault(LayersConfig_1);
    var CSS = {
        base: "gwTree-widget",
    };
    var GWTree = /** @class */ (function (_super) {
        __extends(GWTree, _super);
        function GWTree() {
            var _this = _super.call(this) || this;
            _this.showChildren = true;
            //-------------------------------------------------------------------
            //
            //  Public methods
            //
            //-------------------------------------------------------------------
            _this._getGWTreeData = function () {
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
            _this._createGWTree = function () {
                var tree = new vanillatree_1.default("#GWtree", {
                    contextmenu: [
                        {
                            label: "Hey",
                            action: function (id) {
                                alert("Hey " + id);
                            },
                        },
                        {
                            label: "Blah",
                            action: function (id) {
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
                _this.GWTreeObj.addEventListener("vtree-open", function (event) {
                    //TODO add to layer
                    console.log(event.detail.id + " is opened");
                });
                _this.GWTreeObj.addEventListener("vtree-close", function (event) {
                    //TODO add to layer
                    console.log(event.detail.id + " is opened");
                });
                _this.GWTreeObj.addEventListener("vtree-select", function (event) {
                    //TODO add to layer
                    console.log(event.detail.id + " is opened");
                });
                _this._createGWLayers();
            };
            _this._initGWTree = function () {
                _this.GWTreeObj = document.createElement("div");
                _this.GWTreeObj.id = "GWtree";
                var expandContainer = document.createElement("div");
                expandContainer.onclick = function () {
                    _this._changeListMode();
                };
                _this.expand = new Expand_1.default({
                    view: _this.view,
                    expandIconClass: "esri-icon-applications",
                    content: _this.GWTreeObj,
                    container: expandContainer,
                    id: "gwTree",
                });
                _this.view.ui.add(_this.expand, "top-left");
                var expandElement = document.getElementById("gwTree_controls_content");
                expandElement.style.backgroundColor = "#fff";
                expandElement.style.borderRadius = "7px";
            };
            //-------------------------------------------------------------------
            //
            //  Private methods
            //
            //-------------------------------------------------------------------
            _this._changeListMode = function () {
                if (_this.layersState.groupLayer) {
                    _this.showChildren = !_this.showChildren;
                    _this.layersState.groupLayer.listMode = _this.showChildren
                        ? "show"
                        : "hide-children";
                }
            };
            _this._createGWLayers = function () {
                var groupLayer = new GroupLayer_1.default({
                    title: "GWLayers",
                    listMode: _this.showChildren ? "show" : "hide-children",
                });
                var gwClusterLayer = new FeatureLayer_1.default({
                    title: "gwClusterLayer",
                    fields: LayersConfig_1.default.getClusterField(),
                    objectIdField: "ObjectID",
                    geometryType: "point",
                    spatialReference: { wkid: 4326 },
                    source: [],
                });
                var gwPointLayer = new FeatureLayer_1.default({
                    title: "gwPoint",
                    fields: LayersConfig_1.default.getFields(),
                    objectIdField: "ObjectID",
                    geometryType: "point",
                    spatialReference: { wkid: 4326 },
                    source: [],
                });
                var gwPolygonLayer = new FeatureLayer_1.default({
                    title: "gwPolygon",
                    fields: LayersConfig_1.default.getFields(),
                    objectIdField: "ObjectID",
                    geometryType: "polygon",
                    spatialReference: { wkid: 4326 },
                    source: [],
                });
                var gwPolylineLayer = new FeatureLayer_1.default({
                    title: "gwPolyline",
                    fields: LayersConfig_1.default.getFields(),
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
                _this.layersState = {
                    groupLayer: groupLayer,
                    gwClusterLauyer: gwClusterLayer,
                    gwPointLayer: gwPointLayer,
                    gwPolygonLayer: gwPolygonLayer,
                    gwPolylineLayer: gwPolylineLayer,
                };
                _this.view.map.add(groupLayer);
            };
            _this._onViewChange = function () {
                var _a = _this.view, interacting = _a.interacting, scale = _a.scale, extent = _a.extent;
                _this.mapState = {
                    interacting: interacting,
                    scale: scale,
                    extent: extent,
                };
                if (!interacting) {
                    // query for count
                    // get cluster features
                    // get raw data
                }
                console.log(_this.mapState);
            };
            _this._onViewChange = _this._onViewChange.bind(_this);
            return _this;
        }
        GWTree.prototype.postInitialize = function () {
            this.GWTree();
        };
        GWTree.prototype.GWTree = function () {
            //get tree data
            this._getGWTreeData();
            //Initialize GWtree element
            this._initGWTree();
            //Create the GWTree
            this._createGWTree();
        };
        GWTree.prototype.render = function () {
            var styles = {
                backgroundColor: "white",
                padding: "30px 30px",
                borderRadius: "25px",
            };
            return "";
        };
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], GWTree.prototype, "view", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], GWTree.prototype, "layersState", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], GWTree.prototype, "mapState", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], GWTree.prototype, "showChildren", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], GWTree.prototype, "expand", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], GWTree.prototype, "GWTreeObj", void 0);
        GWTree = __decorate([
            decorators_1.subclass("widgets.GWTree")
        ], GWTree);
        return GWTree;
    }(decorators_1.declared(Widget_1.default)));
    return GWTree;
});
//# sourceMappingURL=GWTree.js.map