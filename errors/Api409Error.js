import BaseError from './BaseError.js';
import httpStatusCodes from '../utils/httpStatusCodes.js';

export default class Api409Error extends BaseError {
  constructor(
    description,
    name,
    statusCode = httpStatusCodes.CONFLICT,
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}