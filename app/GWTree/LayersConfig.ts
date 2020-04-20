class LayerConfig {
  static getFields = () : any => {
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

  static getClusterField = () : any => {
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
}
export = LayerConfig;
