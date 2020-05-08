const express = require("express");
const Projects = require("./projectModel");
const Actions = require("./actionModel");

const router = express.Router();

router.get("/", (req, res) => {

})

router.get("/:id", validateProjectId, (req, res) => {

})

router.get("/:id/actions", validateProjectId, (req, res) => {

})

router.post("/", validateProject, (req, res) => {

})

router.post("/:id/actions", validateProjectId, validateAction, (req, res) => {

})

router.delete("/:id", validateProjectId, (req, res) => {

})

router.put("/:id", validateProjectId, validateProject, (req, res) => {
    
})

//Custom Middleware

function validateProjectId(req, res, next) {

}

function validateProject(req, res, next) {

}

function validateAction(req, res, next) {

}

module.exports = router;