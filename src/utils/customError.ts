/**
 * Custom error class.
 *
 * @extends {Error}
 */
class CustomError extends Error {
   /**
     * Create a custom error.
     *
     * @param {number} status - The HTTP status code.
     * @param {string} message - The error message.
     */
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
