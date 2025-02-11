// pdf-worker.js

// Import the library or script for PDF generation (if required)
importScripts('/js/pdfme.js'); // Adjust the path to your `pdfme` library

const host = location.origin
const fonts = {
  Roboto: {
    data: host + '/fonts/Roboto-Regular.ttf'
  },
  AlegreyaMedium: {
    data: host + '/fonts/Alegreya-Medium.ttf'
  },
  AlegreyaRegular: {
    data: host + '/fonts/Alegreya-Regular.ttf'
  },
  AlegreyaSansMedium: {
    data: host + '/fonts/AlegreyaSans-Medium.ttf'
  },
  CabinMedium: {
    data: host + '/fonts/Cabin-Medium.ttf'
  },
  CabinRegular: {
    data: host + '/fonts/Cabin-Regular.ttf'
  },
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
  PoppinsRegular: {
    data: host + '/fonts/Poppins-Regular.ttf'
  },
  CormorantBold: {
    data: host + '/fonts/Cormorant-Bold.ttf'
  },
  CormorantSemiBold: {
    data: host + '/fonts/Cormorant-SemiBold.ttf'
  },
  CormorantRegular: {
    data: host + '/fonts/Cormorant-Regular.ttf'
  },
  CormorantMedium: {
    data: host + '/fonts/Cormorant-Medium.ttf'
  },
  DMSansMedium: {
    data: host + '/fonts/DMSans-Medium.ttf'
  },
  Inter: {
    data: host + '/fonts/Inter.woff2',
  },
  Rockwell: {
    data: host + '/fonts/rockwell.woff2'
  },
  Saira: {
    data: host + '/fonts/Saira.woff2',
  },
  SourceSerif: {
    data: host + '/fonts/SourceSerif.woff2'
  },
  Sail: {
    data: host + '/fonts/Sail.ttf'
  },
  FrauncesRegular: {
    data: host + '/fonts/Fraunces-Regular.ttf'
  },
  FrauncesSemibold: {
    data: host + '/fonts/Fraunces-SemiBold.ttf'
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