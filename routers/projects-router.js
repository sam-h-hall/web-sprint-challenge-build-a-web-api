const express = require("express");
const projectMethods = require("../data/helpers/projectModel.js");

const router = express.Router();

const serverError = "There was a server error processing your request";

router.get("/", (req, res) => {
  projectMethods.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({
        message: serverError
      });
    });
})

router.get("/:id", (req, res) => {
  const {
    id
  } = req.params;
  projectMethods.get(id)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({
          message: `The project with id ${id} does not exist`
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: serverError
      })
    })
})

router.post("/", (req, res) => {
  projectMethods.insert(req.body)
    .then(project => {
      if (project) {
        res.status(201).json(project);
      } else {
        res.status(404).json({
          message: "Please provide name and description"
        });
      };
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({
        message: serverError
      });
    });
});

router.put("/:id", (req, res) => {
  const {
    id
  } = req.params;
  projectMethods.update(id, req.body)
    .then(changes => {
      if (changes) {
        res.status(200).json(changes)
      } else {
        res.status(404).json({
          message: `Project with id ${id} does not exist`
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: serverError
      })
    })
})

router.delete("/:id", (req, res) => {
  const {
    id
  } = req.params;
  projectMethods.remove(id)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      res.status(500).json({
        message: serverError
      })
    })
})



module.exports = router;