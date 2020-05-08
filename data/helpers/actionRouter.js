const express = require("express");
const Actions = require("./actionModel");

const router = express.Router();

router.get("/", (req, res) => {
    Actions.get()
           .then(actions => {
               if(actions){
                   res.status(200).json(actions)
               }else{
                   res.status(404).json({ message: "List of actions can not be found" })
               }
           })
           .catch(error => {
               console.log({ error })
               res.status(500).json({ message: "Error retrieving list of actions" })
           })
})

router.get("/:id", validateActionId, (req, res) => {
    res.status(200).json(req.action)
})

router.delete("/:id", validateActionId, (req, res) => {
    const { id } = req.params;

    Actions.remove(id)
           .then(count => {
               if(count){
                   res.status(204).end()
               }else{
                   res.status(404).json({ message: "Action with specified id can not be found" })
               }
           })
           .catch(error => {
               console.log({ error })
               res.status(500).json({ message: "Error deleting action with specified id" })
           })
})

router.put("/:id", validateActionId, validateAction, (req, res) => {
    const { id } = req.params;
    const { description, notes } = req.body;
    const { project_id } = req.action;

    Actions.update(id, { description, notes, project_id })
           .then(action => {
               if(action){
                   Actions.get(id)
                          .then(updatedAction => {
                              if(updatedAction){
                                  res.status(200).json(updatedAction)
                              }else{
                                  res.status(404).json({ message: "Updated action can not be found" })
                              }
                          })
                          .catch(error => {
                              console.log({ error })
                              res.status(500).json({ message: "Error finding updated action" })
                          })
               }else{
                   res.status(404).json({ message: "Action with specified id can not be found" })
               }
           })
           .catch(error => {
               console.log({ error })
               res.status(500).json({ message: "Error updating the action with specified id" })
           })
})

//Custom Middleware

function validateActionId(req, res, next) {
    const { id } = req.params;

    Actions.get(id)
           .then(action => {
               if(action){
                   req.action = action;
                   next();
               }else{
                   res.status(404).json({ message: "Action with specified id not found" })
               }
           })
           .catch(error => {
               console.log({ error })
               res.status(500).json({ message: "Error retrieving action with specified id" })
           })
}

function validateAction(req, res, next) {
    const { description, notes } = req.body;

    if(Object.entries(req.body).length === 0){
        res.status(400).json({ message: "No Action Data" })
    }else if(!description || !notes){
        res.status(400).json({ message: "Description and notes fields are required" })
    }else if(description.length > 128){
        res.status(400).json({ message: "Description needs to be less than 128 characters" })
    }else{
        next();
    }
}

module.exports = router;