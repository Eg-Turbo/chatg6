import React from "react"
import { Form, Field } from "react-final-form";
import { fromValidate } from "./formValidate"
import CustomInput from "../customInput/CustomInput"
import { useForgotPasswordMutation } from "../../redux/api/forgotPasword"
import useToast from "../../hooks/useToast"
export default function ForgotPasswordForm({ isEmailSent, changeEmailAddress }) {

    const [forgotPasword] = useForgotPasswordMutation()
    const addToast = useToast()

    let onSubmit = async (values) => {
        changeEmailAddress(values.email)
        await forgotPasword({ email: values.email }).unwrap()
            .then((res) => {
                isEmailSent(true)
            }).catch(() => {
                addToast("error", "something wrong", {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            })
    }

    return (
        <Form
            onSubmit={onSubmit}
            validate={values => fromValidate(values, changeEmailAddress)}
            render={(data) => (
                <form onSubmit={data.handleSubmit} className="w-full">
                    <div className="formBody text-white">
                        <div className="py-8 w-full">
                            <Field name="email" type="text">
                                {({ input, meta }) => (
                                    <CustomInput {...input} type="text" placeholder="Enter your email" touched={meta.touched} error={meta.error} />
                                )}
                            </Field>
                        </div>
                        <button type="submit" className="form-Btn">
                            Send
                        </button>
                    </div>
                </form>
            )}
        >
            <h1>Helo</h1>
        </Form>
    )
}