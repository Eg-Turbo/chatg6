import React from "react"
import Logo from "../../assets/logo.png"

import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { changeActiveChat } from "../../redux/slices/activeChat"
import useClickOutside from "../../hooks/useClickOutside"
import useWindowSize from "../../hooks/useWindowSize"
import classNames from "classnames"
import { ReactComponent as AddIcon } from "../../assets/add-svgrepo-com.svg"
import LiWithMenu from "./LiWithMenu"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


export default function SideNav({ showSideNav, setShowSideNav, modal, changeModalState, confirmationModal, changeConfirmationState, allChats }) {
    const token = Cookies.get("token")

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const [chats, setChats] = React.useState(
        []
    );
    const sideNavRef = React.useRef(null)
    const { width } = useWindowSize()
    const ulRef = React.useRef(null)


    useClickOutside(sideNavRef, () => {
        if (modal || confirmationModal) {
            return
        } else {
            setShowSideNav(false)
        }
    })

    const logOut = ()=>{
        Cookies.remove("token")
        navigate("/login")

    }

    React.useEffect(() => {
        
        if (allChats) {
            setChats(allChats)
            dispatch(changeActiveChat(allChats[0]))
        }
    }, [allChats, token])

    React.useEffect(()=>{
    if (width > 776) {
        setShowSideNav(false)
    }
    },[width])

    return (
        <div ref={sideNavRef} className={classNames(`bg-[rgb(0,30,63)] z-20 text-white w-[250px] h-full transition-all left-0 top-0 origin-left duration-300 scale-x-100 px-4`, { "fixed h-full": width < 776, "!scale-x-0 ": !showSideNav && width < 776 })}
            style={{
                position: width > 776 ? "relative" : "fixed"
            }}
        >
            <div className="h-[60px] flex justify-start items-center">
                {/* <p className="text-2xl">Chat G6</p> */}
                <img src={Logo} alt="Chat g6 logo" className="w-[100px] mt-12 h-[100px] mx-auto" />

                
            </div>

            <div className="overflow-hidden mt-12" style={{ maxHeight: "calc(100% - 120px)" }}>
                <div className="flex justify-between items-center">
                    <p className="my-4">
                        Chats:
                    </p>
                    <button className="flex justify-center items-center w-[30px] h-[30px] rounded-full border-[1px] border-transparent hover:border-white cursor-pointer"
                        onClick={() => {
                            changeModalState(true)
                        }}
                    >

                        <AddIcon className="addIcon w-[20px] h-[20px] " />
                    </button>
                </div>
                <ul className="relative  overflow-y-auto  " style={{ height: "calc(100vh - 180px)" }} ref={ulRef}>
                    {chats && chats.map((chat,index) => (
                        <LiWithMenu chat={chat} key={chat.id} ulRef={ulRef} changeConfirmationState={changeConfirmationState} />
                    ))}
                </ul>

            </div>
            <div className={classNames("absolute bottom-0 right-0 w-full flex justify-center items-center h-[76px] gap-4", { "!hidden": width > 776 })}>

                <button className="text-md hover:bg-[white] hover:text-[rgb(0,30,63)] px-4 py-1 rounded-xl">
                    <Link to="/">
                        Home
                    </Link>
                </button>

                <button className="text-md hover:bg-[white] hover:text-[rgb(0,30,63)] px-4 py-1 rounded-xl" onClick={()=>{
                    logOut()
                }}>
                        Log out
                </button>

            </div>
        </div >

    )
}