export const compressImage = async (file: File): Promise<Blob | null> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return reject(new Error("Failed to get canvas context"));

    const img = new Image();
    const objectURL = URL.createObjectURL(file);

    img.onload = () => {
      const targetWidth = 500;
      const targetHeight = 500;
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const imgWidth = img.width;
      const imgHeight = img.height;

      const scale = Math.max(targetWidth / imgWidth, targetHeight / imgHeight);
      const newWidth = imgWidth * scale;
      const newHeight = imgHeight * scale;

      const offsetX = (targetWidth - newWidth) / 2;
      const offsetY = (targetHeight - newHeight) / 2;

      ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(objectURL);
          resolve(blob);
        },
        "image/webp",
        0.8
      );
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(objectURL);
      reject(new Error("Failed to load image"));
    };

    img.src = objectURL;
  });
};
