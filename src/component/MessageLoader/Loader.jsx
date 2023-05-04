import classNames from "classnames"
import React from "react"

export default function Loader ({className}) {

    return (
        <div className={classNames("flex gap-2 min-h-[50px] !mb-0 items-center justify-center loader" ,className)}>
        <span className="w-[8px] h-[8px] rounded-full bg-gray-400 transition duration-300 -translate-y-[0px]"></span>
        <span className="w-[8px] h-[8px] rounded-full bg-gray-400 transition duration-300 -translate-y-[0px]"></span>
        <span className="w-[8px] h-[8px] rounded-full bg-gray-400 transition duration-300 -translate-y-[0px]"></span>
        </div>
    )
}