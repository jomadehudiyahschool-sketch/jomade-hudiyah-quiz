const express = require("express");

const router = express.Router();

const {

    generateCertificate,

    generateCertificatePDF,

    downloadAllCertificates

} = require("../controllers/certificateController");

router.get(
    "/download/all",
    downloadAllCertificates
);

router.get(
    "/pdf/:id",
    generateCertificatePDF
);

router.get(
    "/:id",
    generateCertificate
);

module.exports = router;