import mongoose, { Schema } from "mongoose";

const favoriteType = new Schema({
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
});

const profileType = new Schema({
  image: {
    type: String,
  },

  address: {
    street: { type: String },
    city: { type: String },
    zipCode: { type: String },
  },

  deliveryAddress: {
    dstreet: { type: String },
    dcity: { type: String },
    dzipCode: { type: String },
  },

  mobile: { type: String },
  gender: { type: String },
});

const userSchema = new Schema(
  {
    username: {
      type: String,
      // required: true,
    },

    fullname: {
      type: String,
      // required: true,
    },

    password: {
      type: String,
      // required: true,
    },

    email: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    favorites: [favoriteType],

    carts: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],

    deliveries: [
      {
        products: [
          {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: Number,
          },
        ],
        payInfo: {
          tid: { type: String },
          sc: { type: String },
          method: { type: String },
        },
        address: {
          street: { type: String },
          city: { type: String },
          zipCode: { type: String },
        },
        did: {
          type: String,
        },
        status: {
          type: String,
          enum: [
            "pending",
            "delivered",
            "shipped",
            "returned",
            "cancelled",
            "failed",
            "refunded",
            "processing",
          ],
          default: "pending",
        },
      },
    ],

    profile: profileType,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
