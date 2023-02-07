var fs = require("fs");

async function uploadImage(fileName) {
	var ImageKit = require("imagekit");
	var fs = require("fs");

	var imagekit = new ImageKit({
		publicKey: "your_public_key",
		privateKey: "your_private_key",
		urlEndpoint: "https://ik.imagekit.io/your_imagekit_id/",
	});

	fs.readFile("image.jpg", function (err, data) {
		if (err) throw err; // Fail if the file can't be read.
		imagekit.upload(
			{
				file: data, //required
				fileName: "my_file_name.jpg", //required
				tags: ["tag1", "tag2"],
			},
			function (error, result) {
				if (error) console.log(error);
				else console.log(result);
			}
		);
	});
}
