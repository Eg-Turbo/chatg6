import React from "react"
import { changeActiveChat } from "../../redux/slices/activeChat"
import { useDispatch, useSelector } from "react-redux"
import { changeDeletedChat } from "../../redux/slices/deletedChat"

import { ReactComponent as Menu } from "../../assets/menu.svg"
import { ReactComponent as Trash } from "../../assets/trash.svg"
import classNames from "classnames"
import useClickOutside from "../../hooks/useClickOutside"
import useWindowSize from "../../hooks/useWindowSize"

export default function LiWithMenu({ chat, ulRef, changeConfirmationState }) {
    const [menu, openMenu] = React.useState(false)
    const selectedChat = useSelector((state) => state.activeChat)
    const menuUlRef = React.useRef(null)
    const menuRef = React.useRef(null)
    const [menuPosition, setMenuPosition] = React.useState("top-[40px] origin-[100%_0%]")
    const dispatch = useDispatch()

    const deleteChat = () => {
        changeConfirmationState(true)
        openMenu(!menu)
        dispatch(changeDeletedChat(chat))
    }

    let size = useWindowSize()
    useClickOutside(menuRef, () => { openMenu(false) })
    return (
        <li
            key={chat.id}
            className={`p-2 mb-3 rounded-lg relative flex justify-between items-center cursor-pointer ${chat.id === selectedChat.id ? "border-[1px] border-white font-bold" : ""
                }`}
            onClick={() => {
                dispatch(changeActiveChat(chat))
            }}

        >
            <p>
                {chat.name}
            </p>
            <div ref={menuRef}>

                <button className="flex items-center justify-center" onClick={() => {
                    openMenu(!menu)
                    if (ulRef.current.getBoundingClientRect().bottom - (menuUlRef.current.getBoundingClientRect().bottom + menuUlRef.current.offsetHeight) < 20 && !menu) {
                        setMenuPosition("!bottom-[35px] origin-[100%_100%]")
                    } else if (ulRef.current.getBoundingClientRect().bottom - (menuUlRef.current.getBoundingClientRect().bottom + menuUlRef.current.offsetHeight) > 20 && !menu) {

                        setMenuPosition("top-[40px] origin-[100%_0%]")
                    }
                }}>
                    <Menu className="w-[20px] h-[20px] menu-icon" />
                </button>
                <ul ref={menuUlRef} className={classNames("absolute bg-white  z-50 w-[150px] p-2 rounded-lg right-0 flex flex-col items-start justify-center gap-2 transition-all duration-300 scale-0 opacity-0", { "scale-100 opacity-100": menu }, menuPosition)}>
                    <li
                        className="text-black border-2 border-transparent hover:bg-[rgb(0,30,63)] hover:text-white rounded-lg px-2 w-full flex items-center justify-between"
                        onClick={() => { deleteChat() }}>
                        <p>
                            Delete
                    </p>
                        <Trash className="w-[20px] h-[20px]" />
                    </li>

                </ul>
            </div>
        </li>
    )
}