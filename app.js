const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");

dotenv.config({ path: "./config/config.env" });

const routes = {
  envelopes: require("./routes/envelopes"),
  docs: require("./routes/swagger"),
}

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use("/api-swagger", routes.docs);

app.use("/api/v1/envelopes", routes.envelopes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
