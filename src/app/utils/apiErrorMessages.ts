export interface ApiError {
  input: string;
  message: string;
}
export const ApiErrorMessage = (apiError: any) => {
  let translation: ApiError | null = null;
  if (apiError !== null && apiError !== undefined) {
    let type = apiError.errorType;
    let input = '';
    let message = apiError.message;
    console.log(type);
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
    translation = {
      message,
      input,
    };
  }
  return translation;
};
