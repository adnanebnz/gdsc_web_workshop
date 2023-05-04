const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Task = require("./models/task");

// initialisation de dotenv pour les variables d'environnement
require("dotenv").config();

// initialisation de l'application express
const app = express();

// MIDDLEWARES POUR GERER LES REQUETES
app.use(cors());

// MIDDLEWARE POUR GERER LES REQUETES EN JSON
app.use(express.json());

//CONNEXION A LA BASE DE DONNEES
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

/* ------------ROUTES------------*/

// REQUETE GET POUR RECUPERER TOUTES LES TACHES
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    if (tasks.length > 0) {
      res.status(200).json(tasks);
    } else {
      res.status(200).json({ message: "aucune tache trouvée" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// REQUETE GET POUR RECUPERER UNE TACHE PAR SON ID
// app.get("/tasks/:id", async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (task) {
//       res.status(200).json(task);
//     } else {
//       res.status(404).json({ message: "tache non trouvée" });
//     }
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// });

// REQUETE PUT POUR MODIFIER UNE TACHE
app.put("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      isDone: req.body.isDone,
    });
    res.status(200).json({ message: "tache modifiée" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// REQUETE POST POUR AJOUTER UNE TACHE
app.post("/tasks", async (req, res) => {
  const task = new Task({
    title: req.body.title,
    body: req.body.body,
    isDone: req.body.isDone,
  });
  try {
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// REQUETE DELETE POUR SUPPRIMER UNE TACHE
app.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "tache supprimée" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

/* ------------FIN DES ROUTES------------*/

// initialisation de la connexion
const port = 8800;
app.listen(port, () => {
  console.log(`Server started! at port ${port}`);
});
