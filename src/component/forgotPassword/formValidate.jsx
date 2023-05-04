function fromValidate(values) {
    const errors = {};
    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!values.email) {
        errors.email = "This field is required";
    } else if (!values.email.match(validEmail)) {
        errors.email = "Enter a valid email";
    }

    return errors;
}

export { fromValidate }