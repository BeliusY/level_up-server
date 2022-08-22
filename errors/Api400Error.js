import BaseError from './BaseError.js';
import httpStatusCodes from '../utils/httpStatusCodes.js';

export default class Api400Error extends BaseError {
  constructor(
    description,
    name,
    statusCode = httpStatusCodes.BAD_REQUEST,
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}