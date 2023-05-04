import { Form, Field } from "react-final-form";
import { formValidate } from "./formValidate"
import { useAddChatMutation } from "../../redux/api/addChat"
import useToast from "../../hooks/useToast"

export default function ModalForm({ refetch, allChats, changeModalState }) {

    const [addChat] = useAddChatMutation()
    const addToast = useToast()



    return (
        <Form
            onSubmit={(values) => {
                addChat({ name: values.chatName, sys_message: values.systemMessage }).unwrap()
                    .then(() => {
                        addToast("success", "The chat was added successfully")
                        refetch()
                        changeModalState(false)
                    }).catch((error) => {
                        if (error.data.sys_message[0]) {
                            addToast("error", error.data.sys_message[0], { autoClose: 5000 })
                        } else {
                            addToast("error", "somthing wrong")

                            changeModalState(false)
                        }

                    })

            }}
            validate={values => formValidate(values, allChats)}

            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center max-h-[380px] overflow-auto scrollbar-hide mb-8 !gap-4">
                        <Field name="chatName">
                            {({ input, meta }) => (
                                <div className="">
                                    <input {...input} type="text" placeholder="Enter the chat name" className="block mx-auto px-4 py-2 rounded-xl focus:outline-none border-2 border-[bg-[rgb(0,30,63)]]" />
                                    {meta.error && meta.touched && <span className="text-sm text-red-500">{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                        <Field name="systemMessage" >
                            {({ input, meta }) => (
                                <div className=" w-[80%] md:w-[350px] ">
                                    <textarea {...input} 
                                    className="!w-full w-full block resize-none px-4 py-2 rounded-xl focus:outline-none border-2 border-[bg-[rgb(0,30,63)]]" cols="25" rows="8" 
                                    placeholder="System message, Examples:
Your goal is to teach me how to solve mathematical proplems
You are an emotional support friend
You are a pirate and you must talk like one
You are a poet and only talk with poems
(Or whatever your imagination might create)"></textarea>

                                    {meta.error && meta.touched && <span className="text-sm text-red-500 self-start">{meta.error}</span>}
                                </div>

                            )}
                        </Field>
                    </div>
                    <div className="flex items-center justify-center gap-4 pb-6">

                        <button className="text-md hover:bg-[rgb(0,30,63)] hover:text-white border-2 px-4 py-1 rounded-xl">
                            Add
                </button>

                        <button className="text-md hover:bg-red-500 hover:text-white border-2 px-4 py-1 rounded-xl" onClick={(e) => {
                            e.preventDefault()
                            changeModalState(false)

                        }}>
                            Cancel
                </button>
                    </div>
                </form>
            )}
        >
            <h1>Helo</h1>
        </Form>
    )
}