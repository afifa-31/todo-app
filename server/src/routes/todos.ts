import { Router } from "express";
import Todo from "../models/Todo";

const router = Router();

// READ all
router.get("/", async (_req, res) => {
  try {
    res.json(await Todo.find().sort({ createdAt: -1 }));
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// CREATE
router.post("/", async (req, res) => {
  try {
    if (!req.body.title?.trim())
      return res.status(400).json({ message: "Title required" });
    const todo = await Todo.create({ title: req.body.title });
    res.status(201).json(todo);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!todo) return res.status(404).json({ message: "Not found" });
    res.json(todo);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;