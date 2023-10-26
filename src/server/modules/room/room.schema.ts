import Joi from 'joi';

import { allowedKeys } from '@/shared/game/game';

export const joinRoomSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  room: Joi.string().alphanum().min(3).max(30).required(),
  pass: Joi.string().alphanum().min(3).max(30).optional(),
});

export const ownerSchema = Joi.object({
  newOwner: Joi.string().alphanum().min(3).max(30).required(),
});

export const moveSchema = Joi.object({
  keyCode: Joi.number()
    .custom((value, helpers) => {
      if (!allowedKeys.includes(value)) {
        return helpers.error('any.invalid');
      }

      return value;
    })
    .required(),
});
