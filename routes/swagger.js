const express = require("express");
const router = express.Router();

const swagger = {
    documentation: require("swagger-jsdoc"),
    ui: require("swagger-ui-express"),
}

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Personal Budget (Envelopes Budget Manager)",
            version: "1.0.0",
            description:
                "Simple backend API to manage a portfolio budget using an envelope budgeting method~",
            license: {
                name: "Licence MIT",
                url: "https://choosealicense.com/licenses/mit/",
            },
        },
    },
    apis: ["./routes/envelopes.js"],
};
const documentation = swagger.documentation(options);

router.use("/", swagger.ui.serve);
router.get("/", swagger.ui.setup(documentation, { explorer: true, }));

module.exports = router;
