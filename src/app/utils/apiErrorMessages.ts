export interface ApiError {
  input: string;
  message: string;
}
export const ApiErrorMessage = (apiError: any) => {
  let translation: ApiError | null = null;
  if (apiError !== null && apiError !== undefined) {
    let input = '';
    let type = '';
    let message = '';
    // If we receive a complex object.
    if (apiError.errorType || apiError.message) {
      type = apiError.errorType;
      message = apiError.message;
      if (type === 'UsernameExistsException') {
        input = 'username';
      } else if (
        type === 'IndividualCodeExistsException' ||
        type === 'ProductExistsException'
      ) {
        input = 'code';
      } else if (type === 'PriceNotValidException') {
        input = 'price';
      } else if (type === 'QuantityNotValidException') {
        input = 'quantity';
      } else {
        message = 'Unknown error';
        input = 'other';
      }
    } else {
      message = apiError;
    }
    translation = {
      message,
      input,
    };
  }
  return translation;
};
