import fs from "fs";
import Printer from "ipp-printer";
import { exec } from "child_process";
import compressPNG from "./compressor.js";

const printer = new Printer({
	name: "DiBi",
	port: 8090,
});

console.log("Printer listening...");

printer.on("job", async function (job) {
	console.log("[job %d] Printing document: %s", job.id, job.name);

	const filename = "job-" + job.id + ".ps";
	const file = fs.createWriteStream("./jobs/" + filename);

	job.on("end", function () {
		console.log("[job %d] Document saved as %s", job.id, filename);
	});

	job.pipe(file);

	const cmd = `sh ps_to_png.sh ./jobs/job-${job.id}.ps ./out/png-${job.id}.png`;
	exec(cmd, (error, stdout, stderr) => {
		console.log(stdout);
		console.log(stderr);
		if (!stderr) {
			try {
				compressPNG(`png-${job.id}.png`);
			} catch (error) {
				console.log(error);
			}
		}
		if (error !== null) {
			console.log(`exec error: ${error}`);
		}
	});
});
