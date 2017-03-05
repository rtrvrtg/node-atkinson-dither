var AtkinsonDither = {};

/**
 * Calculates B/W threshold.
 *
 * @param lum
 */
AtkinsonDither.Threshold = function (lum) {
  return (
    lum <= 128 ?
    0 :
    255
  );
};

/**
 * Convert an RGB image to luminance only.
 *
 * @param imageData
 * @param weighting
 *
 * @return imageData
 */
AtkinsonDither.Luminance = function(imageData, weighting) {
  if (!weighting) {
    weighting = {
      r: 0.3,
      g: 0.59,
      b: 0.11
    }
  }
  var pixels = imageData.data;
  for (var i = 0; i < pixels.length; i += 4) {
    pixels[i] = pixels[i+1] = pixels[i+2] = parseInt(
      (
        pixels[i] * weighting.r +
        pixels[i+1] * weighting.g +
        pixels[i+2] * weighting.b
      ),
      10
    );
  }
  return imageData;
};

/**
 * Perform Atkinson dithering on a luminance image.
 *
 * @param imageData
 *
 * @return imageData
 */
AtkinsonDither.Atkinson = function(imageData) {
  var w = imageData.width,
  oneRow = (4 * w),
  neighbours,
  mono,
  err,
  nj;
  for (var i = 0; i < imageData.data.length; i += 4) {
    neighbours = [
      i + 4,
      i + 8,
      i + oneRow - 4,
      i + oneRow,
      i + oneRow + 4,
      i + (2 * oneRow)
    ];
    // Calculate the B/W threshold and the luminance difference.
    mono = AtkinsonDither.Threshold(imageData.data[i]);
    diff = imageData.data[i] - mono;
    // Set the current pixel.
    imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = mono;
    imageData.data[i + 3] = 255;
    // Distribute 1/8th of the difference to the neighbouring pixels.
    for (var j = 0; j < neighbours.length; j++) {
      nj = neighbours[j];
      imageData.data[nj] += Math.floor(diff / 8);
    }
  }
  return imageData;
};

/**
 * The full Atkinson dithering chain.
 *
 * @param imageData
 *
 * @return imageData
 */
AtkinsonDither.ProcessImage = function(imageData) {
  return AtkinsonDither.Atkinson(AtkinsonDither.Luminance(imageData));
};

// Export module.
module.exports = AtkinsonDither;
