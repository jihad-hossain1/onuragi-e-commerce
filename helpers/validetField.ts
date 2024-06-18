import mongoose from "mongoose";
import { NextResponse } from "next/server";
export const validateFieldMaxMin = (
  field: string,
  fieldName: string,
  minLength: number,
  maxLength: number
) => {
  if (!field || field.trim() === "") {
    throw new Error(`${fieldName} is required`);
  }
  const length = field.trim().length;
  if (length < minLength || length > maxLength) {
    throw new Error(
      `${fieldName} must be between ${minLength} and ${maxLength} characters`
    );
  }
};

export const validateMobile = (mobile: string) => {
  if (!mobile.startsWith("01")) {
    return NextResponse.json(
      { error: "mobile must start with '01'" },
      { status: 400 }
    );
  }
  if (mobile.length !== 11) {
    return NextResponse.json(
      { error: "mobile number must be 11 digits" },
      { status: 400 }
    );
  }
  if (isNaN(Number(mobile))) {
    return NextResponse.json(
      { error: "Invalid mobile format" },
      { status: 400 }
    );
  }
  if (/[^\d]/.test(mobile)) {
    return NextResponse.json(
      { error: "Invalid mobile format" },
      { status: 400 }
    );
  }
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Invalid email format" },
      { status: 400 }
    );
  }
};

export const fieldValidate = (field, fieldName) => {
  if (field === null || field === undefined || field == "" || !field) {
    throw new Error(`${fieldName} is required`);
  }
};

export const validateImage = (image: string) => {
  if (!image) {
    throw new Error("Image is required");
  }
};

export const validateOBJID = (id: string, fieldName: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`${fieldName} is not valid`);
  }
};

// if (
//   !image.startsWith("https://") ||
//   !image.endsWith(".jpg") ||
//   !image.endsWith(".png") ||
//   !image.endsWith(".jpeg") ||
//   !image.endsWith(".webp") ||
//   !image.endsWith(".gif") ||
//   !image.endsWith(".svg")
// ) {
//   throw new Error("Invalid image URL.");
// }
// };
