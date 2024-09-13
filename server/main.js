import { WebApp } from "meteor/webapp";
import fs from "fs";
import path from "path";
import readline from "readline";

WebApp.connectHandlers.use("/api/chunked-file", (req, res, next) => {
  const filePath = path.join(process.env.PWD, "private/patronyms.ndjson");
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
