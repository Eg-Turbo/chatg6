import { useEffect, useRef, useState } from "react";
import classNames from "classnames"
import { useSelector } from "react-redux"

import useClickOutside from "../../hooks/useClickOutside";

export default function Modal({
    openModal,
    changeModalState,
    title,
    children,
    onModalClose = () => { }
}) {

    let [layout, setLayout] = useState(false);
    let [card, setCard] = useState(false)
    let [resetForm, setResetForm] = useState(false)
    const ref = useRef(null);
    useClickOutside(ref, () => openModal && closeModal());

    const closeModal = () => {

        changeModalState(false);
        setCard(false)
        setTimeout(() => {
            onModalClose()
            setLayout(false);
            setResetForm(false)
        }, 300);

    }

    useEffect(() => {
        if (openModal) {
            setLayout(true)
            setResetForm(true)
            setTimeout(() => {
                setCard(true)
            }, 10)
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
                <div
                    className={classNames(`relative  w-[80%] my-6 mx-auto max-w-3xl transition-all duration-300 scale-0 ease-in-out `, { "!scale-x-100 !scale-y-100": card })}
                >
                    {/*content*/}
                    <div
                        className={classNames(`ModalCard border-0 bg-white text-secondary shadow-lg relative relative w-full flex flex-col transition-all ease-in-out duration-[200ms] w-full outline-none focus:outline-none rounded-xl !text-black`)}
                        ref={ref}
                    >
                        {/*header*/}
                        <div className="flex items-start justify-between p-6 xs:p-4 pb-0  rounded-t">
                            <h3 className="xs:text-2xl text-3xl font-semibold text-primary ">{title}</h3>
                        </div>
                        {/*body*/}
                        {resetForm && children}
                    </div>

                </div>
            </div>
        </>
    );
}