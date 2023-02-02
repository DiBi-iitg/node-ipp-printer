import axios from "axios";
import fs from "fs";
import handleParse from "./handleParseResponse.js";

function base64_encode(fileName) {
	var bitmap = fs.readFileSync("./compressed/" + fileName);
	return new Buffer(bitmap).toString("base64");
}

const handleUpload = async (token, fileName) => {
	token = "a9da5c6779f6f45d98d13418066fb6ec";
	const headers = {
		Authorization: `Token ${token}`,
	};
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
			handleParse(resp.data);
		} catch (error) {
			console.log("Error OCR", error);
		}
	} catch (error) {
		console.log(error);
	}
};

export default handleUpload;
