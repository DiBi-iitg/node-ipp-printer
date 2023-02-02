import compress_images from "compress-images";
import uploadImageForOCR from "./handleUpload.js";
const compressPNG = async (inputFileName) => {
	let INPUT_path_to_your_images = `./out/${inputFileName}`;
	let OUTPUT_path = "compressed/";

	compress_images(
		INPUT_path_to_your_images,
		OUTPUT_path,
		{ compress_force: false, statistic: true, autoupdate: true },
		false,
		{ jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
		{ png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
		{ svg: { engine: "svgo", command: "--multipass" } },
		{ gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
		async function (error, completed, statistic) {
			console.log("-------------");
			console.log("Error:", error);
			console.log("Completed:", completed);
			console.log("Statistics", statistic);
			console.log("-------------");
			if (!error) {
				await uploadImageForOCR("", inputFileName);
			}
		}
	);
};

export default compressPNG;
