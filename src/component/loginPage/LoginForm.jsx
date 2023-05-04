import React from "react"
import { Form, Field } from "react-final-form";
import { fromValidate } from "./formValidate"
import CustomInput from "../customInput/CustomInput"
import Cookies from 'js-cookie';
import { useLoginMutation } from "../../redux/api/login"
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useGoogleAuthMutation } from "../../redux/api/googleAuth"
import useToast from "../../hooks/useToast"
import { ReactComponent as GoogleLogo } from "../../assets/google-icon.svg"

export default function LoginForm() {

    const [login] = useLoginMutation()
    const [googleLog] = useGoogleAuthMutation()
    const navigate = useNavigate();
    const addToast = useToast()
    const logIn = useGoogleLogin({
        clientId: "46506568764-mmskn93aiuqaqunupfcllc0kia8pqd29.apps.googleusercontent.com",
        onSuccess: async (googleUser) => {
            googleLog({ access_token: googleUser.access_token }).unwrap().then((res) => {
                Cookies.set("token", res.key)
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
        await login({ username: values.userName, password: values.password }).unwrap()
            .then((res) => {
                Cookies.set("token", res.key)
                navigate("/chat")
            }).catch(() => {
                addToast("error", "username or password is wrong", {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            })
    }
    React.useEffect(() => {
        Cookies.remove("token")
    }, [])
    return (
        <Form
            onSubmit={onSubmit}
            validate={values => fromValidate(values)}
            render={(data) => (
                <form onSubmit={data.handleSubmit} className="w-full">
                    <div className="formBody" style={{ color: "white" }}>
                        <Field name="userName" type="text">
                            {({ input, meta }) => (
                                <CustomInput {...input} type="text" placeholder="userName" touched={meta.touched} error={meta.error} />
                            )}
                        </Field>
                        <Field name="password" type="password">
                            {({ input, meta }) => (
                                <CustomInput {...input} type="password" placeholder="password" touched={meta.touched} error={meta.error} />
                            )}
                        </Field>
                        <div className="flex items-center justify-center gap-4">

                            <button type="submit" className="form-Btn">
                                Submit
                        </button>
                            <button className="form-Btn flex gap-1 items-center justify-center !px-3 !text-black !bg-white !border-white !border-px" onClick={(e) => {
                                e.preventDefault()
                                logIn()
                            }}>
                                sign up
                            <GoogleLogo className="w-[12px] h-[12px] mt-1" />
                            </button>
                        </div>

                    </div>

                </form>
            )}
        >
            <h1>Helo</h1>
        </Form>
    )
}