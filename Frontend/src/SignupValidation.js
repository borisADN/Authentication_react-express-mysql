function Validation(values) {
    let errors = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!values.name) {
        errors.name = "Name is required";
    }
    if (!values.email) {
        errors.email = "Email is required";
    } else if (!email_pattern.test(values.email)) {
        if (/\s/.test(values.email)) {
            errors.email = "Email must not contain spaces";
        } else if (!/^[^\s@]+/.test(values.email)) {
            errors.email = "Email must contain characters before '@'";
        } else if (!/@/.test(values.email)) {
            errors.email = "Email must contain '@'";
        } else if (!/\.[^\s@]{2,}$/.test(values.email)) {
            errors.email = "Email must have a valid domain (e.g., '.com')";
        } else {
            errors.email = "Email is invalid";
        }
    }
    if (!values.password) {
        errors.password = "Password is required";
    } else if (!password_pattern.test(values.password)) {
        if (values.password.length < 8) {
            errors.password = "Password is too short. It should be at least 8 characters long";
        } else if (values.password.length > 8) {
            errors.password = "Password is too long. It should not exceed 20 characters";
        } else if (!/[a-zA-Z\d]/.test(values.password)) {
            errors.password = "Password must be alphanumeric";
        } else if (!/[@$!%*?&]/.test(values.password)) {
            errors.password = "Password must contain at least one special character (@$!%*?&)";
        } else {
            errors.password = "Password is invalid";
        }
    }

    return errors;
}

export default Validation;