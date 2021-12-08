const kmlParse = require("kml-parse");
const fs = require("fs-extra");
const DOMParser = require("xmldom").DOMParser;

const kmlDom = new DOMParser().parseFromString(
  fs.readFileSync("cosule.kml", "utf-8")
);

let result = kmlParse.parseGeoJSON(kmlDom);

const foo = result.features.filter((x) => x.geometry.coordinates != undefined);

foo.map((x) => {
  if (x.geometry.type == "Polygon") {
    x.geometry.coordinates[0] = x.geometry.coordinates[0].map((cords) => {
      return [cords[1], cords[0], cords[2]];
    });
  }
});

result.features = foo;

const json = JSON.stringify(result);

fs.writeFile("result.json", json, "utf-8");
