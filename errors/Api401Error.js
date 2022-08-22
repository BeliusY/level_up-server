import BaseError from './BaseError.js';
import httpStatusCodes from '../utils/httpStatusCodes.js';

export default class Api401Error extends BaseError {
  constructor(
    description,
    name,
    statusCode = httpStatusCodes.UNAUTHORIZED,
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}