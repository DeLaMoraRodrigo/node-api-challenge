const express = require("express");
const Actions = require("./actionModel");

const router = express.Router();

router.get("/", (req, res) => {

})

router.get("/:id", validateActionId, (req, res) => {

})

router.delete("/:id", validateActionId, (req, res) => {

})

router.put("/:id", validateActionId, validateAction, (req, res) => {
    
})

//Custom Middleware

function validateActionId(req, res, next) {

}

function validateAction(req, res, next) {

}

module.exports = router;