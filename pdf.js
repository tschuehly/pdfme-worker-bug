import {generate} from "@pdfme/generator"
import {Designer, Viewer} from "@pdfme/ui"
import {barcodes, image, svg, text} from "@pdfme/schemas"

// Check if "window" is available; fallback to "self" in Web Worker environments
const globalScope = typeof window !== "undefined" ? window : self;

globalScope.Promise.withResolvers = function () {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return {promise, resolve, reject};
};

globalScope.pdf = {
  generate,
  Viewer,
  barcodes,
  image,
  svg,
  text,
  Designer
};