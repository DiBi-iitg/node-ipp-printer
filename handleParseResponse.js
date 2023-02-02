import * as fsExtra from "fs-extra";

const handleParse = (response) => {
	const prediction = response?.document?.inference?.prediction;
	if (!prediction) {
		console.log("Error parsing");
		return;
	}
	// console.log(prediction["customer_address"]);
	// console.log(prediction["customer_company_registrations"]);
	console.log(prediction["customer_name"]);
	let txns = [];
	prediction["line_items"].forEach((item) => {
		txns.push({
			id: "id",
			itemName: item.description ? item.description.toString() : "not-present",
			itemQty: item.quantity ? item.quantity.toString() : "not-present",
			itemPrice: item.unit_price ? item.unit_price.toString() : "not-present",
			itemTotal: item.total_amount ? item.total_amount.toString() : "not-present",
		});
	});
	console.log(txns);
	// prediction["line_items"].forEach((item) => {
	// 	console.log("-----------------------------");
	// 	console.log(
	// 		"Item:",
	// 		item.description,
	// 		"\n",
	// 		"Qty:",
	// 		item.quantity ? item.quantity : "not-in-invoice",
	// 		"\n",
	// 		"Total",
	// 		item.total_amount,
	// 		"\n"
	// 	);
	// 	console.log("-----------------------------");
	// });
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
