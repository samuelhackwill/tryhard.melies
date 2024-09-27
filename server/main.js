import { WebApp } from "meteor/webapp";
import fs from "fs";
import path from "path";
import readline from "readline";

// console.log("assets absoluteFilePath", filePath);
// console.log("process.env.PWD ", process.env.PWD);
// console.log("process.env ", process.env);

const description =
  "Une sorte de jeu de piste dans la base de données des patronymes français. Je sais pas vraiment d'où sort le jeu de données, il y a 800 000+ noms, y compris des noms rares (dont le mien). Les noms s'affichent en plus grand s'ils sont plus courants.";

WebApp.connectHandlers.use("/api/hello", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins (use specific domains for more security)
  res.setHeader("Content-Type", "text/plain");

  res.write(description);
  res.end();
});

WebApp.connectHandlers.use("/api/chunked-file", (req, res, next) => {
  // hello my name is samuel i'm an idiot please uncomment this line when we're running the app localy
  // console.log("private path ", process.env.PWD, process.env);
  // console.log(filePath);
  // console.log(Assets.absoluteFilePath("patronyms.ndjson")); // const filePath = path.join(
  //   process.env.PWD,
  //   "/prot5/private/patronyms.ndjson"
  // );
  filePath = Assets.absoluteFilePath("patronyms.ndjson");

  const chunkSize = parseInt(req.query.chunkSize) || 10000; // Lines per chunk
  let chunkIndex = parseInt(req.query.chunk) || 0; // Get the chunk index from the query param

  let currentLine = 0; // Track line number
  let chunkData = []; // Store lines for the current chunk

  const readStream = fs.createReadStream(filePath, { encoding: "utf8" });
  const rl = readline.createInterface({ input: readStream });

  rl.on("line", (line) => {
    if (
      currentLine >= chunkIndex * chunkSize &&
      currentLine < (chunkIndex + 1) * chunkSize
    ) {
      chunkData.push(JSON.parse(line)); // Parse and store each line as JSON
    }
    currentLine++;

    if (currentLine >= (chunkIndex + 1) * chunkSize) {
      rl.close(); // Stop reading after the desired chunk
    }
  });

  rl.on("close", () => {
    res.write(JSON.stringify(chunkData)); // Send the chunk as JSON
    res.end();
  });

  rl.on("error", (err) => {
    console.error("Error reading the file:", err);
    res.statusCode = 500;
    res.end("Server error");
  });
});
