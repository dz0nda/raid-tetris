import Joi from 'joi';

export const sendChatMessageSchema = Joi.object({
  text: Joi.string().alphanum().min(3).max(30).required(),
});
