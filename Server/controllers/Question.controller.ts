import { Request, Response } from "express";
import { question } from "../models/Question.model";
import { User } from "../Models/user.model";
import mongoose from "mongoose";
import fs from "fs";
import { promisify } from "util";
import stream from "stream";

const ObjectId = mongoose.Types.ObjectId;
const pipeline = promisify(stream.pipeline);

interface MulterFile {
  detectedMimeType?: string;
  size: number;
  stream: NodeJS.ReadableStream;
}

interface CustomRequest extends Request {
  file?: MulterFile;
}

export const readArticle = async (_req: Request, res: Response) => {
  try {
    const docs = await question.find().sort({ createdAt: -1 });
    res.send(docs);
  } catch (err) {
    console.log("Erreur de réception :", err);
    res.status(500).send(err);
  }
};

export const createQuestion = async (
  req: CustomRequest,
  res: Response
) => {

  try {
    const questions = await question.create({
      category: req.body.category,
      subCategory: req.body.category.subCategory,
      enonce: req.body.category.subCategory.questions.enonce,
      answer: req.body.category.subCategory.question.answer,
    });

    return res.status(201).json(questions);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const updateQuestion = async (req: Request, res: Response) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Id inconnue: " + req.params.id);
  }

  try {
    const updated = await question.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          
        },
      },
      { new: true }
    );

    res.send(updated);
  } catch (err) {
    console.log("Erreur update :", err);
    res.status(500).send(err);
  }
};

export const deleteQuestion = async (req: Request, res: Response) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Id inconnue: " + req.params.id);
  }

  try {
    const deleted = await question.findByIdAndDelete(req.params.id);
    res.send(deleted);
  } catch (err) {
    console.log("Erreur suppression :", err);
    res.status(500).send(err);
  }
};

export const commentQuestion = async (
  req: Request,
  res: Response
) => {
  try {
    const updated = await question.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterName: req.body.commenterName,
            text: req.body.text,
            timestamp: Date.now(),
          },
        },
      },
      { new: true }
    );

    res.send(updated);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const editCommentQuestion = async (
  req: Request,
  res: Response
) => {
  try {
    const doc = await question.findById(req.params.id);

    if (!doc) return res.status(404).send("Question introuvable");

    const comment = doc.comments.find((c: any) =>
      c._id.equals(req.body.commentId)
    );

    if (!comment) {
      return res.status(404).send("Commentaire introuvable");
    }

    comment.text = req.body.text;

    await doc.save();

    res.send(doc);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const deleteCommentQuestion = async (
  req: Request,
  res: Response
) => {
  try {
    const updated = await question.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: { _id: req.body.commentId },
        },
      },
      { new: true }
    );

    res.send(updated);
  } catch (err) {
    res.status(400).send(err);
  }
};