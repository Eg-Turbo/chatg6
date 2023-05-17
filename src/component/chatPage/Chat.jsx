import React, { useState, useRef } from "react";
import Modal from "../modal/Modal"
import classNames from "classnames"
import { Link } from "react-router-dom"
import useWindowSize from "../../hooks/useWindowSize"
import Sidenav from "./ChatSidenav"
import { useGetChatsQuery } from "../../redux/api/getChats"
import Cookies from "js-cookie"
import Loader from "../MessageLoader/Loader"
import { useSelector } from "react-redux"
import { useDeleteChatMutation } from "../../redux/api/deleteChat"
import useToast from "../../hooks/useToast"
import { useGetMessagesQuery } from "../../redux/api/getMessages"
import { useOlderMessagesMutation } from "../../redux/api/olderMessages"
import { useNavigate } from 'react-router-dom';
import { changeActiveChat } from "../../redux/slices/activeChat"
import { useDispatch } from "react-redux"



import ModalForm from "./ModalForm"
import ConfirmationModal from "../confirmationModal/confirmationModal"

import { ReactComponent as Bars } from "../../assets/bars.svg"
import { ReactComponent as SendIcon } from "../../assets/send.svg"
import AudioRecorder from "../AudioRecorder"
import MessageBox from "./MessageBox";

const ChatPage = () => {
  const dispatch = useDispatch()
  const [loader, showLoader] = useState(false)
  const { data: allChats, refetch } = useGetChatsQuery(null)
  const deletedChat = useSelector(state => state.deletedChat)
  const activeChat = useSelector(state => state.activeChat)
  const [inputText, setInputText] = useState("")
  const [messages, setMessages] = useState(null)
  const [showSideNav, setShowSideNav] = useState(false);
  const [socket, setSocket] = useState(null);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [pageNumber, changePageNumber] = useState(2)
  const [fetchOldMessages, changeFetchOldMessagesState] = useState(false)
  let [modal, changeModalState] = useState(false)
  let [confirmationModal, setConfirmationModal] = useState(false)
  let chatRef = useRef(null)
  const addToast = useToast()
  const { width } = useWindowSize()
  const [deleteChat] = useDeleteChatMutation()
  const { data: allMessages, refetch: refetchMessages } = useGetMessagesQuery({ id: activeChat.id })
  const [olderMessages] = useOlderMessagesMutation()
  const moreinfo = useGetMessagesQuery({ id: activeChat.id, p: 1 })
  const navigate = useNavigate();

  const [initMessages, setinitMessages] = useState([])



  const handleSendMessage = (messagex) => {
    let battern = {
      user_msg: messagex,
      assistant_msg: "",
      id: ""
    }

    setMessages((messages) => {

      const lastMessage = messages[messages.length - 1];
      return [...messages, battern];

    });

  };
  React.useEffect(() => {
    chatRef.current.removeEventListener('scroll', handleScroll);
    setMessages(null)
    changeFetchOldMessagesState(false)
    // console.log("done");
  }, [activeChat])
  React.useEffect(() => {
    changePageNumber(2)
  }, [activeChat])
  React.useEffect(() => {
    if (loader) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [loader])



  React.useEffect(() => {
    refetchMessages({ id: activeChat.id })
    refetch()
  }, [activeChat])

  React.useEffect(() => {
    if (allMessages) {
      let reverse = [...allMessages.results].reverse()
      if (allMessages.next) {
        // console.log("here i'm ",allMessages.next);
        changeFetchOldMessagesState(true)
      }
      // console.log("all messages is" , allMessages);
      setMessages(reverse)
    }
    // allMessages && setMessages(allMessages.results.reverse()) 
    allMessages && setinitMessages(allMessages.results)
    // console.log("????????????", messages, allMessages);
  }, [allMessages])

  React.useEffect(() => {
    if (width > 776) {
      setShowSideNav(false)
    }
  }, [width])

  React.useEffect(() => {
    const token = Cookies.get("token")
    let url = `wss://g6ai-backend.herokuapp.com/ws/socket-chat/?token=${token}`

    const newSocket = new WebSocket(url)

    newSocket.addEventListener('open', () => {
      console.log('WebSocket connection opened');
    });


    newSocket.addEventListener('message', (event) => {
      let data = event
      let letter = JSON.parse(event.data)

      if (letter.status == "start") {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
        setIsInputDisabled(true)

      }
      if (letter.status !== null && letter.status !== "start") {
        setIsInputDisabled(false)
      }
      if (!letter.status)
        setMessages((messages) => {
          const lastMessage = messages[messages.length - 1];

          return [...messages.slice(0, -1), { ...lastMessage, assistant_msg: lastMessage.assistant_msg + letter.content }];

        });


    });

    newSocket.addEventListener('close', () => {
      console.log('WebSocket connection closed');
    });

    setSocket(newSocket);


    return () => {
      newSocket.close();
    };

  }, [])

  React.useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [initMessages])

  const sendMessage = (message) => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;

    let data = []
    // console.log("mesagaga",messages);

    messages.forEach((message, index) => {
      if (index < 30) {
        data.unshift(["assistant", message.assistant_msg])
        data.unshift(["user", message.user_msg])
      } else {
        return
      }
    })
    data.unshift(["user", message])
    setIsInputDisabled(true); // disable user input
    socket.send(JSON.stringify({ content: data, chat_id: activeChat.id }));
    // console.log({ content: data,chat_id: activeChat.id});
  };

  function handleScroll() {
    // console.log("WTFFFFFFFFFFFF",activeChat);
    // console.log("fetch is ",fetchOldMessages);
    if (fetchOldMessages) {
      if (chatRef.current.scrollTop === 0) {
        // fetch older messages
        // console.log(activeChat.id,"id is");   
        olderMessages({ chatId: activeChat.id, page: pageNumber }).unwrap().then((res) => {
          setMessages((messages) => {
            let reverse = [...res.results].reverse()

            return [...reverse, ...messages];

          });
          if (!res.next) {
            changeFetchOldMessagesState(false)
            // console.log("closed");
          } else {
            changePageNumber(pageNumber + 1)
          }
          // console.log(res);
        }).catch((err) => {
          // console.log(err);
          changeFetchOldMessagesState(false)
        })
      }

    }
    // console.log("active chat is ",activeChat);
  }


  React.useEffect(() => {
    // add event listener to the scroll event
    chatRef.current.addEventListener('scroll', handleScroll);
    // remove event listener when component unmounts
    return () => {
      if (chatRef.current) {
        chatRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeChat, fetchOldMessages, pageNumber]);

  const logOut = () => {
    Cookies.remove("token")
    navigate("/login")

  }


  return (

    <div className="flex relative" style={{
      minHeight: window.innerHeight,
      maxHeight: window.innerHeight
    }}>
      <Modal openModal={modal} changeModalState={changeModalState} >
        <ModalForm refetch={refetch} allChats={allChats} changeModalState={changeModalState} />
      </Modal>

      <ConfirmationModal openModal={confirmationModal} changeModalState={setConfirmationModal} warningMessage="Deleting this chat will also delete all messages within it. Are you sure you want to proceed?" deleteFunction={() => {
        deleteChat(deletedChat.id).unwrap().then(() => {
          dispatch(changeActiveChat({}))
          refetch()
          addToast("success", "Chat was deleted successfully")
        }).catch((error) => {
        })
        // console.log(deletedChat);
      }} />

      <Sidenav showSideNav={showSideNav} setShowSideNav={setShowSideNav} modal={modal} changeModalState={changeModalState} confirmationModal={confirmationModal} changeConfirmationState={setConfirmationModal} allChats={allChats} refetchAllChats={refetch} />


      <div className="flex flex-1 flex-col relative z-10" style={{
        minHeight: window.innerHeight,
        maxHeight: window.innerHeight
      }}>

        <div className={classNames("flex items-center justify-between relative bg-white text-[#1D1D1D]  p-4 ", { "!justify-center": width < 776 })}>
          <button className={classNames("text-lg absolute top-1/2 -translate-y-1/2 left-4", { "hidden": width > 776 })} onClick={() => setShowSideNav(true)}>
            <Bars className="w-[20px] h-[20px] " />
          </button>
          <div className={classNames("sm:text-lg  font-bold", { "self-center": width < 776 })}>{activeChat.name ? activeChat.name : "Create new chat"}</div>
          <div className={classNames("flex gap-2 items-center", { "hidden": width < 776 })}>

            <button className="text-md hover:bg-[rgb(0,30,63)] hover:text-white px-4 py-1 rounded-xl">
              <Link to="/">
                Home
              </Link>
            </button>

            <button className="text-md hover:bg-[rgb(0,30,63)] hover:text-white px-4 py-1 rounded-xl" onClick={() => { logOut() }}>
              Log out
            </button>

          </div>
        </div>
        {
          <>
            <div ref={chatRef} className={classNames("flex-1 bg-[#F2F2F2] p-4 overflow-y-scroll", { "!p-2": width < 400, "hidden": !activeChat.id })}>

              {
                (messages !== null && messages.map((message, index) => (
                  <MessageBox message={message} key={message.id || index} />
                )))
              }
              {
                loader && <Loader className='p-2 rounded-lg mb-2 w-fit text-left max-w-[80%] break-words !self-end ml-auto bg-white ' />
              }
            </div>
            <div className={classNames(`bg-[#F2F2F2] p-4 flex items-center flex-wrap`, { "hidden": !activeChat.id })}>
              <div data-value={inputText} className="inline-grid textarea-container w-full items-center relative pt-1 px-2 items-stretch max-h-[150px] ">
                <div className="flex items-stretch w-full relative gap-4 max-h-[150px]" style={{
                  gridArea: "2/1"
                }}>
                  <textarea
                    type="text"
                    placeholder="Type your message here"
                    className="bg-white w-full pr-[60px] chat-input resize-none word-break border-box pt-4 pb-0 rounded-[25px] pl-4 max-h-[150px]"

                    onChange={(e) => {
                      setInputText(e.target.value)
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        if (isInputDisabled) {
                          return
                        } else {
                          if (event.target.value.split(" ").length > 100) {
                            addToast("error", "You reach the maximum number of words, try to make your message less than 100 words")
                          } else if (event.target.value.length > 1000) {
                            addToast("error", "You reach the maximum number of characters, try to make it less than 1000 character")

                          } else if (event.target.value) {
                            sendMessage(event.target.value)
                            handleSendMessage(inputText);
                            event.target.value = "";
                          }
                        }
                      }
                    }}
                  />
                  <button onClick={() => {
                    if (isInputDisabled) {
                      return
                    } else {

                      const inputElement = document.querySelector('.chat-input');
                      if (inputElement.value) {
                        sendMessage(inputElement.value);
                        handleSendMessage(inputElement.value);
                        inputElement.value = "";
                      }
                    }
                  }}>
                    <SendIcon className="w-[30px] h-[30px]" />
                  </button>
                  <AudioRecorder loader={loader} isInputDisabled={isInputDisabled} setIsInputDisabled={setIsInputDisabled} showLoader={showLoader} addUserMessage={handleSendMessage} sendToSocket={sendMessage} />
                </div>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default ChatPage;
