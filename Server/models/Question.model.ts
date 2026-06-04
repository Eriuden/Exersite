import mongoose, { Document, Schema } from "mongoose";

export type difficultyType = "a" | "b" | "c" | "d"
export type categoryType = "Langues" | "sciences" | "culture"
export type subcategoryType = "Math" | "anglais" | "histoire"

export interface IQuestion extends Document {
  category : [
    categoryType: categoryType,
    subCategory : [
        subcategoryType : subcategoryType,
        questions : [
            enonce: string,
            answer: string,
            difficulty : difficultyType ,
            comments: [
                commenterId: string,
                commenterName : string,
                text: string,
                timestamp: Number
            ]
        ]
    ]
  ]
}

const questionSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 55,
      unique: true,
      trim: true,
    },

    subCategory: {
      type: String,
      required: true,
      unique: true,
    },

    questions: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024,
    },
  },
  {
    timestamps: true,
  }
);

export const question = mongoose.model<IQuestion>(
  "Question",
  questionSchema
);