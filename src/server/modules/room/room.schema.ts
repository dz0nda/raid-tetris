import Joi from 'joi';

import { allowedKeys } from '../../helpers/gameHelper';

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
