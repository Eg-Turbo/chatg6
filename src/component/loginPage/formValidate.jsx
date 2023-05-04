function fromValidate(values) {
    const errors = {};
    if (!values.userName) {
        errors.userName = "This field is required";
    }

    if (!values.password) {
        errors.password = "This field is required";
    }

    return errors;
}

export { fromValidate }