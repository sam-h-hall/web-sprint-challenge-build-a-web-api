const express = require("express");
const actionMethods = require("../data/helpers/actionModel.js");
const projectMethods = require("../data/helpers/projectModel.js");

const router = express.Router();

const serverError = "There was a server error processing your request";

router.get("/", (req, res) => {
  actionMethods.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({
        message: serverError
      });
    });
});

router.get("/:id", (req, res) => {
  const {
    id
  } = req.params;
  actionMethods.get(id)
    .then(action => {
      action ? res.status(200).json(action) :
        res.status(404).json({
          message: `Action with id ${id} does not exist`
        })
    })
    .catch(err => {
      res.status(500).json({
        message: serverError
      });
    });
});

router.post("/:id", (req, res) => {
  const {
    id
  } = req.params;
  req.body.project_id = id;
  projectMethods.get(id)
    .then(project => {
      project ?
        actionMethods.insert(req.body)
        .then(action => {
          res.status(201).json(action)
        })
        .catch(err => {
          res.status(500).json({
            message: serverError
          })
        }) :
        res.status(404).json({
          message: `Project with id ${id} does not exist`
        })
    })
    .catch(err => {
      res.status(500).json({
        message: serverError
      })
    })
});

router.put("/:id", (req, res) => {
  const {
    id
  } = req.params;
  actionMethods.update(id, req.body)
    .then(changes => {
      res.status(200).json(changes)
    })
    .catch(err => {
      res.status(500).json({
        message: serverError
      });
    });
});

router.delete("/:id", (req, res) => {
  const {
    id
  } = req.params;
  actionMethods.remove(id)
    .then(action => {
      res.status(200).json(action)
    })
    .catch(err => {
      res.status(500).json({
        message: serverError
      });
    });
});

module.exports = router;