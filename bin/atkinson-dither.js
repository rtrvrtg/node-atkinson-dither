#!/usr/bin/env node

var argv = require('yargs').argv,
    AtkinsonDitherFile = require('../lib/atkinson-dither-file');

if (!argv.i) {
  console.error('No input file path (-i) provided.');
  exit(1);
}

if (!argv.o) {
  console.error('No output file path (-o) provided.');
  exit(1);
}

AtkinsonDitherFile(argv.i, argv.o, function(err, ok) {
  if (!!err) {
    console.error(err);
    process.exit(1);
  }
  else {
    process.exit(0);
  }
});
