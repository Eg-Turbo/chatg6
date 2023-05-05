import React from "react"
import { Form, Field } from "react-final-form";
import { fromValidate } from "./formValidate"
import CustomPasswordInput from "../customInput/CustomPasswordInput"
import Cookies from 'js-cookie';
import { useResetPasswordMutation } from "../../redux/api/resetPassword"
import useToast from "../../hooks/useToast"
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function ResetPasswordForm({ isEmailSent }) {

    const { userid, key } = useParams()
    const [resetPassword] = useResetPasswordMutation()
    const addToast = useToast()
    const navigate = useNavigate()
    let onSubmit = async (values) => {
        await resetPassword({ new_password1: values.password, new_password2: values.confirm, uid: userid, token: key }).unwrap()
            .then((res) => {
                navigate("/login")
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
            validate={values => fromValidate(values)}
            render={(data) => (
                <form onSubmit={data.handleSubmit} className="w-full">
                    <div className="formBody text-white">

                        <Field name="password">
                            {({ input, meta }) => (
                                <CustomPasswordInput {...input} placeholder="Enter your email" touched={meta.touched} error={meta.error} />
                            )}
                        </Field>
                        <Field name="confirm">
                            {({ input, meta }) => (
                                <CustomPasswordInput {...input} placeholder="Enter your email" touched={meta.touched} error={meta.error} />
                            )}
                        </Field>
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