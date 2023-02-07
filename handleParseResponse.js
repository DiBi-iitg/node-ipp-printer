import * as fsExtra from "fs-extra";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const handleParse = async (response, receiptLink) => {
	const prediction = response?.document?.inference?.prediction;
	if (!prediction) {
		console.log("Error parsing");
		return;
	}
	// console.log(prediction["customer_address"]);
	// console.log(prediction["customer_company_registrations"]);
	let consumerDetail = prediction["customer_name"].value.toString();
	let vendorId = prediction["invoice_number"].value.toString();
	let totalAmount = prediction["total_amount"].value.toString();
	let txns = [];

	prediction["line_items"].forEach((item) => {
		txns.push({
			id: uuidv4(),
			itemName: item.description ? item.description.toString() : "not-present",
			itemQty: item.quantity ? item.quantity.toString() : "not-present",
			itemPrice: item.unit_price ? item.unit_price.toString() : "not-present",
			itemTotal: item.total_amount ? item.total_amount.toString() : "not-present",
		});
	});
	let invoiceNumber = uuidv4();
	console.log("Uploading data...");
	try {
		const resp = await axios.post("http://localhost:8080/api/transaction", {
			vendorId,
			consumerDetail,
			invoiceNumber,
			txns,
			totalAmount,
			receiptLink,
		});
		console.log(resp.data);
		console.log("Uploading done!");
	} catch (error) {
		console.log("Error uploading!");
	}
	console.log("Cleaning files...");
	try {
		fsExtra.emptyDirSync("./compressed");
		fsExtra.emptyDirSync("./jobs");
		fsExtra.emptyDirSync("./out");
	} catch (error) {
		console.log(error);
	}
	console.log("***************DONE****************");
};
export default handleParse;
