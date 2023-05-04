import React from "react";
import classNames from "classnames"

import "./main.css"

export default function PasswordInput({ type, placeholder, error, touched, ...props }) {

    let [inputType, changeInputType] = React.useState("password")

    return (
        <div className="text-start w-full">
            <div className="custom-input relative w-full">
                <input {...props} type={inputType} placeholder={placeholder} className={classNames("w-full", { "!border-red-500": error && touched })} />
                <span
                    className="cursor-pointer absolute right-4 text-white top-1/2 text-sm text-main -translate-y-1/2"
                    onClick={(e) => {
                        e.preventDefault()
                        inputType === "password" ? changeInputType("text") : changeInputType("password")
                    }}
                >{inputType === "password" ? "show" : "hide"}</span>
            </div>
            {error && touched && <p className="text-red-500 text-sm mt-2">{error}</p>}

        </div>
    );
}