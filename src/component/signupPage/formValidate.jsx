function formValdate(values) {
    const errors = {};
    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validPassword = /^.{8,}$/
    if (!values.username) {
        errors.username = "This field is required";
    }

    if (!values.email) {
        if (values.username && !errors.username)
            errors.email = "This field is required";
    } else if (!values.email.match(validEmail)) {
        if (values.username && !errors.username)
            errors.email = "Enter a valid email";
    }

    if (!values.password) {
        if (values.username && values.email && !errors.email && !errors.username)
            errors.password = "This field is required";
    } else if (!values.password.match(validPassword)) {
        if (values.username && values.email && !errors.email && !errors.username)
            errors.password = "This password must contain at least 8 characters";
    }

    if (!values.confirm) {
        if (values.password && !errors.password)
            errors.confirm = "This field is required";
    } else if (values.password !== values.confirm) {
        errors.confirm = "the password and the confirmed password must be the same";
    }

    return errors;
}

export { formValdate }