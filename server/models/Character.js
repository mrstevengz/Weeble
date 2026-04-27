import { Schema, model } from "mongoose";

const characterSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    gender: {
      type: String,
      required: [true, "Please add the character's gender"],
    },
    series: {
      type: String,
      required: [true, "Please add the character's series"],
    },
    age: {
      type: Number,
      required: [true, "Please add the character's age"],
    },
    hair_color: {
      type: String,
      required: [true, "Please add the character's hair color"],
    },
  },
  { timestamps: true },
);

export default model("Character", characterSchema);
