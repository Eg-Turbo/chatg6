import "./main.css"
import classNames from "classnames"
export default function CustomInput({ type, placeholder, error, touched, ...props }) {

    return (
        <div className="custom-input w-100 text-start w-full">
            <input {...props} type={type} placeholder={placeholder} className={classNames("w-full", { "!border-red-500": error && touched })} />
            {error && touched && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    )
}