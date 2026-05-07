import { Schema, model } from "mongoose";

const characterSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
      maxlength: 100,
    },
    gender: {
      type: String,
      required: [true, "Please add the character's gender"],
      maxlength: 10,
    },
    age_group: {
      type: String,
      required: [true, "Please add the character's age group"],
      enum: [
        "Child (0-12)",
        "Teen (13-17)",
        "Young Adult (18-25)",
        "Adult (26-40)",
        "Older (40+)",
        "Ageless",
      ],
    },
    series: {
      type: String,
      required: [true, "Please add the character's series"],
      maxlength: 50,
    },
    series_demographic: {
      type: String,
      required: [true, "Please add the series' demographic"],
      maxlength: 150,
    },
    series_decade: {
      type: String,
      required: [true, "Please add the character's age"],
      maxlength: 30,
    },
    role: {
      type: String,
      required: [true, "Please add the character's role in the series"],
      maxlength: 50,
    },
    hair_color: {
      type: String,
      required: [true, "Please add the character's hair color"],
      maxlength: 50,
    },
  },
  { timestamps: true },
);

export default model("Character", characterSchema);
