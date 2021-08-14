export interface ApiError{
    type: string,
    message: string
}
export const ApiErrorMessage = (apiError: any)=> {
    let translation : ApiError | null = null;
    if(apiError !== null && apiError !== undefined){
        translation = {
            type : '',
            message : apiError.message
        }
        let type = apiError.errorType;
        switch(type){
            case 'UsernameExistsException':
                translation = {
                    ...translation,
                    type: 'username',
                }
                break;
            case 'IndividualCodeExistsException': 
                translation = {
                    ...translation,
                    type: 'code',
                };
                break;
            default: 
                translation ={
                    ...translation,
                    type: 'other'
                }
                break;
        }
    }
    return translation;
}