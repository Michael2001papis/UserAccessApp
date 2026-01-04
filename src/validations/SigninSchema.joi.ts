import Joi from "joi";

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@%$#^&*-_*])(?=(?:.*\d){4,}).{8,}$/;

export const SignInJoiSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Invalid email format",
    }),
  password: Joi.string()
    .min(8)
    .pattern(passwordRegex)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "string.pattern.base": "Password must have: 1 uppercase letter, 1 lowercase letter, at least 4 digits, and 1 special character from !@%$#^&*-_*",
    }),
});

export const RegisterJoiSchema = SignInJoiSchema;
