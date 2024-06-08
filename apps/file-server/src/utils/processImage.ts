import path from "path";
import sharp from "sharp";

export const processImage = async (
  filePath: string,
  folderPath: string
): Promise<{ name: string; path: string }[]> => {
  const sizes = [
    { name: "thumbnail", width: 50, height: 50 },
    { name: "small", width: 100, height: 100 },
    { name: "medium", width: 300, height: 300 },
    { name: "large", width: 800, height: 800 },
    { name: "extra-large", width: 1600, height: 1600 },
  ];

  try {
    const imagePaths = await Promise.all(
      sizes.map(async (size) => {
        const resizedImagePath = path.join(folderPath, `${size.name}.webp`);
        await sharp(filePath)
          .resize(size.width, size.height, { fit: "inside" })
          .webp({ quality: 80 }) // Convert to WebP with quality 80
          .toFile(resizedImagePath);

        return {
          name: size.name,
          path: resizedImagePath,
        };
      })
    );
    console.log("Image processing completed.");
    return imagePaths;
  } catch (error) {
    console.error("Error processing image:", error);
    return [];
  }
};
