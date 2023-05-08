import React from "react"
import { franc } from 'franc';
import classNames from "classnames";
import useWindowSize from "../../hooks/useWindowSize"
import useClickOutside from "../../hooks/useClickOutside";
import { ReactComponent as Copy} from "../../assets/clipboard-solid.svg"

export default function MessageBox ({message}){
    const [dateMenu,openDateMenu] = React.useState(false)
    const [userBtn,openUserBtn] = React.useState(false)
    const [assistantBtn,openAssistantBtn] = React.useState(false)
    const { width } = useWindowSize()
    const userRef = React.useRef(null)
    const assistantRef = React.useRef(null)

    const showCopyBtn = (keyword)=>{
      keyword == "user" ? openUserBtn(!userBtn) : openAssistantBtn(!assistantBtn)
    }

    function isArabic(message) {
        const language = franc(message);
        return language === "arb" ? true : false
        // Do something with the detected language
      }
    
      const handelDateMenu = ()=>{
        openDateMenu(!dateMenu)
      }

      function copyToClipboard(refDiv) {
        const divContent = refDiv.current.innerText;
        navigator.clipboard.writeText(divContent);
      }
      const handelDate = (date) =>{
        const utcDate = new Date(date);
        
        const offsetMinutes = new Date().getTimezoneOffset();
        
        const localDate = new Date(utcDate.getTime() - (offsetMinutes * 60 * 1000));
        
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        const localDateString = localDate.toLocaleString('en-US', options);
        // Step 1: Create a new Date object from the local date/time string
        const [dayOfWeek, monthStr, dayStr, yearStr,noth, time,ampm, timezoneStr] =
          localDateString.split(' ');
        
        // Step 2: Parse the month string into a number (1-based)

        const month = new Date(Date.parse(monthStr + ' 1, 2022')).getMonth() + 1;
        
        // // Step 3: Parse the day and year strings into numbers
        const day = parseInt(dayStr.replace(',', ''));
        if (localDate.getTime() < utcDate.getTime()) {
            day += 1;
          }
        const year = parseInt(yearStr);
        // // Step 4: Extract the time components (hours, minutes, seconds, AM/PM)
        const [hours, minutes, seconds] = time.split(':').map((val) => parseInt(val));
        
        // // Step 5: Adjust the hours based on the AM/PM value
        const adjustedHours = ampm === 'AM' ? hours % 12 : (hours % 12) + 12;

        return `${day}/${month}/${year} at:${hours}:${minutes} ${ampm}`
          }
          useClickOutside(userRef,()=>{openUserBtn(false)})
          useClickOutside(assistantRef,()=>{openAssistantBtn(false)})
    return (
            <div className="flex flex-col justify-start items-start w-full gap-8 mb-8 overflow-hidden">
                <div
                  className={classNames(`p-2 relative rounded-lg mb-2 w-fit text-left max-w-[80%] !self-end bg-white ${isArabic(message.assistant_msg) ? "!text-right" : ""}`,{"max-w-[80%]":width>776,"max-w-[90%]":width<450})}
                  ref={userRef}
                  style={{
                    wordBreak:"break-word"
                  }}
                  onClick={()=>{
                    showCopyBtn("user")
                  }}
                >
                  {message.user_msg}
                  <button onClick={()=>{copyToClipboard(userRef)}} className={classNames("absolute top-[20px] -translate-y-1/2 -right-[45px] transition-all dureation-300",{"!right-[5px]":userBtn})}>
                  <Copy className="w-[20px] h-[20px] fill-[rgb(0,30,63)]"/>
                  </button>
                  {/* {message.created_at && (
                    <div className={classNames("absolute top-full right-0 min-w-[110px] text-right text-[12px]",{"hidden":!dateMenu})}>
                        {handelDate(message.created_at)}
                    </div>
                  )} */}
                </div>
                <div
                  className={classNames(`p-2 rounded-lg relative mb-2 w-fit text-left max-w-[80%] self-start bg-gray-200 whitespace-pre-wrap ${isArabic(message.assistant_msg) ? "!text-right" : ""}`,{"!max-w-[80%]":width > 776,"max-w-[90%]":width<450})}
                  ref={assistantRef}
                  onClick={()=>{
                    showCopyBtn("assistant")
                  }}
                  style={{
                    wordBreak:"break-word"
                  }}
                >
                  
                  {message.assistant_msg}
                  <button onClick={()=>{copyToClipboard(assistantRef)}} className={classNames("absolute top-[20px] -translate-y-1/2 -left-[45px] transition-all dureation-300",{"!left-[5px]":assistantBtn})}>
                  <Copy className="w-[20px] h-[20px] fill-[rgb(0,30,63)]"/>
                  </button>
                </div>
              </div>
    )
}