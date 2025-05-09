"use server";

import axios from "axios";
import sharp from "sharp";

const getImageBufferFromUrl = async (imageUrl: string): Promise<Buffer> => {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    return Buffer.from(response.data, "binary");
};

const getDominantColor = async (imageUrl: string): Promise<string> => {
    const imageBuffer = await getImageBufferFromUrl(imageUrl);
    const stats = await sharp(imageBuffer).stats();
    const { r, g, b } = stats.dominant;

    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
};

const getContrastColor = (hexColor: string): string => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
};

export async function main(imageUrl: string) {
    "use server";

    const dominantColor = await getDominantColor(imageUrl);
    const textColor = getContrastColor(dominantColor);

    return { dominantColor, textColor };
}
