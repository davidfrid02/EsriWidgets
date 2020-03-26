# Esri Custom Widgets

Create Custom widgets for esri javascript api


## Getting Started

We are here to corporate and create a lot of widgets to use


### Prerequisites

Install [Node.js](https://nodejs.org/en/download/)

Install typescript globally:  

```
npm install -g typescript
```


### Installing

To start working you need to:

```
cd EsriWidgets
```

Run npm install

```
npm install
```

Then compile the project

```
tsc
```


## Usage
Create index.html with esri map
In Head tag insert
```
<script>
    var locationPath = location.pathname.replace(/\/[^\/]+$/, "");
    window.dojoConfig = {
    packages: [
            {
                name: "widgets",
                location: locationPath + "/widgets"
            }
        ]
    };
</script>
```

Add the widgeto to the require list 
```
require("..", "widgets/Recenter"],
function(..., Recenter){}
```

And call it in view.then

```
    view.when(function() {
        recenter = new Recenter({
            view: view,
            initialCenter: [-100.33, 43.69]
        });
        view.ui.add(recenter, "top-right");
    });
```
## Running the tests

```
npm jest
```


## Deployment

Add additional notes about how to deploy this on a live system


## Built With

* [ESRI](https://developers.arcgis.com/javascript/) - The web framework used


## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.


## Versioning

Version 1.0.0


## Authors

* **Shahar Bukra** - *Initial work* - [shaharbukra](https://github.com/shaharbukra)
* **David Fried** - *Initial work* - [davidfrid02](https://github.com/davidfrid02)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
