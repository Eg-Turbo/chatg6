import React from "react";
import classNames from "classnames"
import { ReactComponent as OpenEye } from "../../assets/eye-solid.svg"
import { ReactComponent as ClosedEye } from "../../assets/eye-slash-solid.svg"

import "./main.css"

export default function PasswordInput({ type, placeholder, error, touched, ...props }) {

    let [inputType, changeInputType] = React.useState("password")
    let openEye = <OpenEye className="w-[15px] fill-white" />
    let closedEye = <ClosedEye className="w-[16px] fill-white" />


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
                >{inputType === "password" ? openEye : closedEye}</span>
            </div>
            {error && touched && <p className="text-red-500 text-sm mt-2">{error}</p>}

        </div>
    );
}