var fs = require('fs'),
    Canvas = require('canvas'),
    AtkinsonDither = require('./atkinson-dither');

/**
 * Determine which Canvas stream function to use to export.
 */
var OutStreamFunction = function(outFile) {
  var ext = outFile.split('.').pop(),
  outFunction = null;
  ext = ext.toLowerCase();
  switch (ext) {
    case 'png':
      outFunction = 'toBuffer';
      break;
  }
  return outFunction;
};

/**
 * Read an image, Atkinson dither it, then write it.
 */
var AtkinsonDitherFile = function(inFile, outFile, cb) {
  var outFunction = OutStreamFunction(outFile);
  if (!outFunction) {
    cb({
      message: 'ERROR: Can only output JPEG and PNG.'
    }, false);
    return;
  }

  fs.readFile(inFile, function(err, data) {
    if (err) {
      cb(err, false);
      return;
    }
    var img = new Canvas.Image();
    img.onload = function() {
      var c = new Canvas(img.width, img.height),
      ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);

      var imgData = ctx.getImageData(0, 0, img.width, img.height);

      var processed = AtkinsonDither.ProcessImage(imgData);
      ctx.putImageData(processed, 0, 0);

      var buf = c.toBuffer();

      fs.writeFile(outFile, buf, function(err, res) {
        if (!!err) {
          cb(err, false);
        }
        else {
          cb(null, true);
        }
      });
    };
    img.src = data;
  });
};

module.exports = AtkinsonDitherFile;
