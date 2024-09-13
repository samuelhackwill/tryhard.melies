import { WebApp } from "meteor/webapp";
import fs from "fs";
import path from "path";

WebApp.connectHandlers.use("/api/chunked-file", (req, res, next) => {
  const chunkSize = 1024 * 64; // 64KB per chunk
  const filePath = path.join(process.env.PWD, "private/patronyms.js");

  let chunkIndex = parseInt(req.query.chunk) || 0; // Get the chunk index from the query param
  const start = chunkIndex * chunkSize; // Calculate where the chunk starts

  // Open a read stream starting at the calculated position
  const readStream = fs.createReadStream(filePath, {
    encoding: "utf8",
    start: start,
    end: start + chunkSize - 1,
  });

  readStream.on("data", (chunk) => {
    res.write(chunk);
  });

  readStream.on("end", () => {
    res.end();
  });

  readStream.on("error", (err) => {
    console.error("Error reading the file:", err);
    res.statusCode = 500;
    res.end("Server error");
  });
});
