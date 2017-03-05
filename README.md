# Atkinson Dither for Node.JS

An implementation of the Atkinson dithering algorithm suitable for Node.JS.

[http://verlagmartinkoch.at/software/dither/index.html](http://verlagmartinkoch.at/software/dither/index.html)

## Installation

`npm install atkinson-dither`

## Usage

### On the command line

`atkinson-dither -i input-file.png -o output-file.png`

### In another Node.JS script

```javascript
var AtkinsonDither = require('atkinson-dither');

// Where imageData is loaded from Canvas or similar...
AtkinsonDither.ProcessImage(imageData);
```
