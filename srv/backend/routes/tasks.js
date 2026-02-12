import express from "express";
import fallbackTasks from "../fallbackData.js";
import { getDB } from "../db.js";

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = await getDB();
    
    if (!db) {
      console.log('📋 Utilisation du fallback (DB non disponible)');
      return res.json(fallbackTasks);
    }
    
    const [rows] = await db.query('SELECT * FROM tasks');
    res.json(rows);
  } catch (error) {
    console.error('⚠️ Erreur lors de la récupération des tâches:', error);
    console.log('📋 Utilisation du fallback (erreur DB)');
    res.json(fallbackTasks);
  }
});

router.post("/", async (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ message: "Le champ 'text' est requis" });
  }

  try {
    const db = await getDB();

    if (!db) {
      const nextId = fallbackTasks.length
        ? Math.max(...fallbackTasks.map((t) => t.id)) + 1
        : 1;

      const newTask = { id: nextId, text: text.trim() };
      fallbackTasks.push(newTask);
      console.log('📋 Tâche ajoutée au fallback');
      return res.status(201).json({ success: true, task: newTask, fallback: true });
    }

    await db.query("INSERT INTO tasks (text) VALUES (?)", [text]);
    res.status(201).json({ success: true });
  } catch (error) {
    console.error('⚠️ Erreur lors de l\'ajout de la tâche:', error);
    const nextId = fallbackTasks.length
      ? Math.max(...fallbackTasks.map((t) => t.id)) + 1
      : 1;

    const newTask = { id: nextId, text: text.trim() };
    fallbackTasks.push(newTask);
    console.log('📋 Tâche ajoutée au fallback (erreur DB)');
    return res.status(201).json({ success: true, task: newTask, fallback: true });
  }
});

export default router;
