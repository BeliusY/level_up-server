import BaseError from './BaseError.js';
import httpStatusCodes from '../utils/httpStatusCodes.js';

export default class Api404Error extends BaseError {
  constructor(
    description,
    name,
    statusCode = httpStatusCodes.NOT_FOUND,
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}