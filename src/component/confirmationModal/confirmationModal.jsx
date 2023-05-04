
import { useEffect, useRef, useState } from "react";
import classNames from "classnames"

import useClickOutside from "../../hooks/useClickOutside";



import { ReactComponent as DangerIcon } from "../../assets/danger.svg";


export default function ConfirmationModal({
    openModal,
    changeModalState,
    deleteFunction = () => { },
    warningMessage,
    refetch
}) {

    let [layout, setLayout] = useState(false);
    let [modal, setModal] = useState(false)
    const ref = useRef(null);

    useClickOutside(ref, () => openModal && closeModal());


    function closeModal() {
        changeModalState(false);
        setModal(false)
        setTimeout(() => {
            setLayout(false);
        }, 300);
    }


    useEffect(() => {
        if (openModal) {
            setLayout(true)
            setTimeout(() => {
                setModal(true)
            }, 100)
        } else {
            closeModal()
        }

    }, [openModal]);

    return (
        <>
            <div
                className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed  flex ${layout ? "fixed bg-cyan-800/50 flex" : "hidden"
                    }  inset-0 z-50 outline-none focus:outline-none`}
            >
                <div className={`relative  my-6 mx-auto max-w-3xl`}>
                    {/*content*/}

                    <div
                        className={classNames(`ModalCard border-0 bg-white text-secondary p-12 py-8 rounded-2xl shadow-lg relative relative flex flex-col justify-evenly items-center transition-all ease-in-out duration-[200ms] mx-auto  w-[85%] h-[450px] outline-none focus:outline-none scale-0 opacity-0`, { "scale-100 opacity-100": modal })}
                        ref={ref}
                    >
                        <div className="icon">
                            <DangerIcon className="w-24 h-24" />
                        </div>
                        <div className="text-center">
                            <h1 className="text-3xl bold mb-4 font-semibold">
                                Are You Sure ?
                </h1>
                            <p className="text-xl bold">
                                {warningMessage}
                            </p>
                        </div>
                        <div className="btns flex justify-center items-center gap-8">




                            <button className="text-md bg-[rgb(0,30,63)]  text-white px-5 py-2 rounded-xl" onClick={() => { closeModal() }}>
                                close
                            </button>
                            <button className="text-md bg-red-500 text-white px-4 py-2 rounded-xl" onClick={() => { deleteFunction(); closeModal() }}>
                                Delete
                            </button>

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}