// pdf-worker.js

// Import the library or script for PDF generation (if required)
importScripts('pdfme.js'); // Adjust the path to your `pdfme` library

const host = location.origin
const fonts = {
  PlayfairDisplaySemibold: {
    data: host + '/fonts/PlayfairDisplay-SemiBold.ttf'
  },
  PlayfairDisplayMedium: {
    data: host + '/fonts/PlayfairDisplay-Medium.ttf',
    fallback: true
  },
  PlayfairMedium: {
    data: host + '/fonts/Playfair-Medium.ttf'
  },
  PlayfairRegular: {
    data: host + '/fonts/Playfair-Regular.ttf'
  },
  HankenGroteskRegular: {
    data: host + '/fonts/HankenGrotesk-Regular.ttf'
  }
};

const image = self.pdf.image
const svg = self.pdf.svg
const text = self.pdf.text
const barcodes = self.pdf.barcodes
const generate = self.pdf.generate
const Viewer = self.pdf.Viewer

const plugins = {
  Image: image,
  Text: text,
  QR: barcodes.qrcode,
  SVG: svg
};

// This is the Web Worker event handler
self.onmessage = async function (event) {
  const { pdfTemplate } = event.data;
  console.log("pdfTemplate", pdfTemplate)
  try {
    const inputs = [{}]
    console.log("Start PDF generation: " + inputs.length + " inputs");

    const pdf = await generate({
      template: pdfTemplate,
      plugins,
      inputs,
      options: {
        font: fonts,
        colorType: 'cmyk'
      }
    });

    console.log("PDF generation finished, size: ", pdf.length, " bytes");

    // Send the result back to the main thread
    self.postMessage({ pdf });
  } catch (error) {
    console.error("Error in worker:", error);
    self.postMessage({ error: error.message });
  }
};