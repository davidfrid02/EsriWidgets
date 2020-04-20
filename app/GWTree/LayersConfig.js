define(["require", "exports"], function (require, exports) {
    "use strict";
    var LayerConfig = /** @class */ (function () {
        function LayerConfig() {
        }
        LayerConfig.getFields = function () {
            return [
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
            ];
        };
        LayerConfig.getClusterField = function () {
            return [
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
            ];
        };
        return LayerConfig;
    }());
    return LayerConfig;
});
//# sourceMappingURL=LayersConfig.js.map