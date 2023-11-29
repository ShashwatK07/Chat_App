import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    userId: {
      type: String,
    },
    imgUrl: {
      type: String,
    },
    caption: {
      type: String,
    },
    status: {
      type: String,
      default: "NF",
      // NF - NOT FLAGGED
      // CF - CURRENTLY FLAGGED
      // FN - FLAGGED AND NO MORPH FOUND
      // MorphedID followed BY 'FF' - FLAGGED AND MORPHING FOUND - Eg- "FF6bedfjhdjkafkhafhex1242hg"
    },
    commentedBy: {
      // ** COMMENTS IDs */
      type: [String],
    },
    likedBy: {
      type: [String],
    },
    journey: {
      //IDs of user recieved the post
      type: [String],
    },
    blockId: {
      type: String, //BLockchain id/key of the image
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("post", PostSchema);
