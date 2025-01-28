import jsPDF from "jspdf";

export const printQRCode = async (imageUrl: string) => {
  try {
    const pdf = new jsPDF();

    // Load the image from the URL
    const img = new Image();
    img.crossOrigin = "anonymous"; // Handle CORS for external images
    img.src = imageUrl;

    img.onload = () => {
      const imgWidth = 180; // Width in mm for the PDF
      const imgHeight = (img.height * imgWidth) / img.width; // Maintain aspect ratio

      // Add image to PDF (x, y, width, height)
      pdf.addImage(img, "PNG", 10, 10, imgWidth, imgHeight);

      // Open the print dialog
      pdf.autoPrint();
      window.open(pdf.output("bloburl"), "_blank"); // Open print dialog in a new tab
    };
  } catch (error) {
    console.error("Error while generating PDF:", error);
  }
};
