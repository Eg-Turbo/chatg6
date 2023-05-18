import { formValdate } from "./formValidate"
import { useNavigate } from 'react-router-dom';
import CustomPasswordInput from "../customInput/CustomPasswordInput"
import { useRegistrationMutation } from "../../redux/api/registration"
import { Form, Field } from "react-final-form";
import { useGoogleLogin } from '@react-oauth/google';
import { useGoogleAuthMutation } from "../../redux/api/googleAuth"

import CustomInput from "../customInput/CustomInput"

import useToast from "../../hooks/useToast"

import { ReactComponent as GoogleLogo } from "../../assets/google-icon.svg"

export default function LoginForm() {

    let navigate = useNavigate()
    const [regist] = useRegistrationMutation()
    const [googleLog] = useGoogleAuthMutation()

    const addToast = useToast()

    const logInWithGoogle = useGoogleLogin({
        clientId: "46506568764-mmskn93aiuqaqunupfcllc0kia8pqd29.apps.googleusercontent.com",
        onSuccess: async (googleUser) => {
            googleLog({ access_token: googleUser.access_token }).unwrap().then((res) => {
                localStorage.setItem("token", res.key)
                navigate("/chat")
            }).catch((err) => {
                // console.log(err);
            })
            // console.log('Logged in successfully!', googleUser.access_token);
        },
        onFailure: async (error) => {
            console.error('Failed to log in!', error);
        },
    })
    let onSubmit = async (values) => {
        await regist({
            username: values.username,
            email: values.email,
            password1: values.password,
            password: values.confirm
        }).unwrap()
            .then(() => {
                navigate("/login")
            })
            .catch((error) => {
                let myerror = error.data[Object.keys(error.data)[0]][0]
                if (myerror) {
                    addToast("error", myerror, {
                        autoClose: 5000
                    })
                } else {
                    addToast("error", "Please try again later")
                }
            })
    }

    return (
        <Form
            onSubmit={onSubmit}
            validate={values =>
                formValdate(values)
            }
            render={({ handleSubmit, submitting, }) => (
                <form onSubmit={handleSubmit}>
                    <div className="formBody max-h-[380px] overflow-auto scrollbar-hide mb-8 !gap-4" style={{ color: "white" }}>
                        <Field name="username">
                            {({ input, meta }) => (
                                <CustomInput touched={meta.touched} error={meta.error} type="text" placeholder="Username" {...input} />
                            )}
                        </Field>
                        <Field name="email">
                            {({ input, meta }) => (
                                <CustomInput {...input} touched={meta.touched} error={meta.error} type="text" placeholder="Email" />
                            )}
                        </Field>
                        <Field name="password">
                            {({ input, meta }) => (
                                <CustomPasswordInput {...input} touched={meta.touched} error={meta.error} type="password" placeholder="Password" />
                            )}
                        </Field>
                        <Field name="confirm">
                            {({ input, meta }) => (
                                <CustomPasswordInput {...input} touched={meta.touched} error={meta.error} type="password" placeholder="Confirm" />
                            )}
                        </Field>
                    </div>
                    <div className="flex items-center justify-center gap-4">

                        <button type="submit" disabled={submitting} className="form-Btn">
                            Submit
                    </button>

                        <button className="form-Btn flex gap-1 items-center justify-center !px-3 !text-black !bg-white !border-white !border-px" onClick={(e) => {
                            e.preventDefault()
                            logInWithGoogle()
                        }}>
                            sign up
                            <GoogleLogo className="w-[12px] h-[12px] mt-1" />
                        </button>
                    </div>
                </form>
            )}
        >
            <h1>Helo</h1>
        </Form>
    )
}