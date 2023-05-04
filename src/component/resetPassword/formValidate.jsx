function fromValidate(values) {
    const errors = {};
    const validPassword = /^.{8,}$/

    if (!values.password) {
        errors.password = "This field is required";
    } else if (!values.password.match(validPassword)) {
        errors.password = "This password must contain at least 8 characters";
    }

    if (!values.confirm) {
        errors.confirm = "This field is required";
    } else if (values.password !== values.confirm) {
        errors.confirm = "the password and the confirmed password must be the same";
    }

    return errors;
}

export { fromValidate }