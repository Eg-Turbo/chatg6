import classNames from "classnames";



export default function FormBtn({
  onClick = () => {},
  children,
  design = "block",
  type = "button",  
  className = "",
  style,
  ...rest
}) {
  return (
    <button
      className={classNames(
        "bg-transparent py-[5px] text-white hover:border-active px-[20px] border-2 border-primary rounded",
        className
      )}
      onClick={onClick}
      style={style}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
}

// background-color: transparent;
// padding: 5px 20px;
// border: none;
// border:2px solid #0a7d95ba;
// color: white;
// border-radius: 10px;
// outline: none;