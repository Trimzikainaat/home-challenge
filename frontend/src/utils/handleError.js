function handleError(error) {
    if (error.message) {
        return error.message;
    } else if (error.errors) {
        const errorMessage = error.errors.map((e) => e.message).join(' ');
        return errorMessage;
    } else {
        return 'An error occurred while processing your request.';
    }
}

export default handleError;
