import axios from "axios";
import fs from "fs";
import handleParse from "./handleParseResponse.js";
import { v4 as uuidv4 } from "uuid";
import ImageKit from "imagekit";

function base64_encode(fileName) {
	var bitmap = fs.readFileSync("./compressed/" + fileName);
	return new Buffer(bitmap).toString("base64");
}
let imgUrl = "";
const handleUpload = async (token, fileName) => {
	var imagekit = new ImageKit({
		publicKey: "public_LaFHvYlRSIezyXMjeNveffVMjQg=",
		privateKey: "private_O9xhYIOfLnjZlnIqE0U0+IwmE5c=",
		urlEndpoint: "https://ik.imagekit.io/dibiinteriit/",
	});

	token = "a9da5c6779f6f45d98d13418066fb6ec";
	const headers = {
		Authorization: `Token ${token}`,
	};

	fs.readFile("./compressed/" + fileName, function (err, data) {
		if (err) throw err;
		imagekit.upload(
			{
				file: data, //required
				fileName: fileName, //required
			},
			function (error, result) {
				if (error) console.log(error);
				else {
					imgUrl = result.url;
					console.log(result);
				}
			}
		);
	});

	const formdata = new FormData();
	formdata.append("document", base64_encode(fileName));

	try {
		const resp = await axios.post(
			"https://api.mindee.net/v1/products/mindee/invoices/v4/predict",
			formdata,
			{
				headers: headers,
			}
		);
		try {
			let content = JSON.stringify(resp.data);

			if (!content) {
				console.log("No content");
				console.log("Content", content);
				return;
			}
			fs.writeFileSync("response.json", content, (err) => {
				console.log(err);
				return;
			});
			handleParse(resp.data, imgUrl);
		} catch (error) {
			console.log("Error OCR", error);
		}
	} catch (error) {
		console.log(error);
	}
};

export default handleUpload;
