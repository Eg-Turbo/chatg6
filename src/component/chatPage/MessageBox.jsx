import React from "react"
import { franc } from 'franc';
import classNames from "classnames";
import useWindowSize from "../../hooks/useWindowSize"


export default function MessageBox ({message}){
    const [dateMenu,openDateMenu] = React.useState(false)
    const { width } = useWindowSize()
    function isArabic(message) {
        const language = franc(message);
        return language === "arb" ? true : false
        // Do something with the detected language
      }
    
      const handelDateMenu = ()=>{
        openDateMenu(!dateMenu)
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

    return (
            <div className="flex flex-col justify-start items-start w-full gap-8 mb-8">
                <div
                  className={classNames(`p-2 relative rounded-lg mb-2 w-fit text-left max-w-[80%] break-words !self-end bg-white ${isArabic(message.assistant_msg) ? "!text-right" : ""}`,{"w-[80%]":width>776,"w-[90%]":width<450})}
                  onClick={()=>{
                    handelDateMenu()
                  }}
                >
                  {message.user_msg}
                  {/* {message.created_at && (
                    <div className={classNames("absolute top-full right-0 min-w-[110px] text-right text-[12px]",{"hidden":!dateMenu})}>
                        {handelDate(message.created_at)}
                    </div>
                  )} */}
                </div>
                <div
                  className={classNames(`p-2 rounded-lg mb-2 w-fit text-left max-w-[80%] break-words self-start bg-gray-200 whitespace-pre-wrap ${isArabic(message.assistant_msg) ? "!text-right" : ""}`,{"!max-w-[80%]":width > 776,"w-[90%]":width<450})}
                >
                  {message.assistant_msg}
                </div>
              </div>
    )
}