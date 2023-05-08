import { useState, useRef } from "react";
import classNames from "classnames"
import useToast from "../hooks/useToast"
import { ReactComponent as Mic } from "../assets/mic-svgrepo-com.svg"
import { ReactComponent as Stop } from "../assets/stop-svgrepo-com.svg"
import { useVoiceMutation } from "../redux/api/Voice";
const mimeType = 'audio/webm;codecs=opus;bitrate=128000';
const AudioRecorder = ({loader,showLoader}) => {

    let counter = 1
    const [intervalId, setIntervalId] = useState("")
    const [counterDiv, showCounter] = useState(false)
    const [second, setSecond] = useState("00");
    const [minute, setMinute] = useState("00");
    // const [counter, setCounter] = useState(0);
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState(null);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);
    const [sendVoice] = useVoiceMutation()
    const addToast = useToast()

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setRecordingStatus("recording");
                //create new Media recorder instance using the stream
                setStream(streamData);
                setPermission(true);
                const media = new MediaRecorder(streamData,{ "type": mimeType });
                //set the MediaRecorder instance to the mediaRecorder ref
                mediaRecorder.current = media;
                //invokes the start method to start the recording process
                mediaRecorder.current.start();
                let localAudioChunks = [];
                mediaRecorder.current.ondataavailable = (event) => {
                    if (typeof event.data === "undefined") return;
                    if (event.data.size === 0) return;
                    localAudioChunks.push(event.data);
                };
                setAudioChunks(localAudioChunks);

            } catch (err) {
                addToast("error",err.message)


            }
        } else {
            addToast("error","The MediaRecorder API is not supported in your browser.")

        }
        
    };

  

    const stopRecording = () => {
        setRecordingStatus("inactive");
        // showLoader(true)
        //stops the recording instance
        mediaRecorder.current.stop()
        mediaRecorder.current.onstop = () => {
            //creates a blob file from the audiochunks data

            const audioBlob = new Blob(audioChunks, { "type": mimeType });
       
            const url = URL.createObjectURL(audioBlob);

            const formData = new FormData();

            formData.append("file", audioBlob,"file.webm");
            sendVoice(formData).unwrap().then((res)=>{
            console.log(res);
                }).catch((err)=>{
                    
            console.log(err);

            })


            //creates a playable URL from the blob file.
            setAudioChunks([]);
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
            // stream

        };
    };

    const startCounter = () => {
        let intervalId;
        showCounter(true)
        intervalId = setInterval(() => {
            const secondCounter = counter % 60;
            const minuteCounter = Math.floor(counter / 60);

            let computedSecond =
                String(secondCounter).length === 1
                    ? `0${secondCounter}`
                    : secondCounter;
            let computedMinute =
                String(minuteCounter).length === 1
                    ? `0${minuteCounter}`
                    : minuteCounter;
            setSecond(computedSecond);
            setMinute(computedMinute);
            counter++
            // setCounter(+counter + 1);
        }, 1000);

        setIntervalId(intervalId)
      
    }


    const stopCounter = () => {
        clearInterval(intervalId)
        showCounter(false)
        // setCounter(0);
        setSecond("00");
        setMinute("00");
    }
    const handelRecord = () => {

         if (recordingStatus === "recording") {
            showCounter(false)
            stopCounter()
            stopRecording()
        }else {
            getMicrophonePermission()
            startCounter()
        }

    }
    return (
        <div className="absolute right-[60px] top-1/2 -translate-y-1/2 ">

            <button onClick={handelRecord} className={classNames("w-[35px] h-[35px] rounded-full flex justify-center items-center bg-[rgb(0,30,63)]", { "bg-white border-[1px] border-[rgb(0,30,63)]": recordingStatus === "recording" })}>
                {
                    !permission ? (
                        <Mic className="w-[25px] h-[25px] fill-red-500" />)
                        : permission && recordingStatus === "inactive" ?
                            (<Mic className="w-[25px] h-[25px] fill-white" />)
                            :
                            (<Stop className="w-[22px] h-[22px]" />)

                }

            </button>
            <div className={classNames("absolute -left-[50px] top-1/2 -translate-y-1/2 hidden", { "!block": counterDiv })}>
                <p>{minute}:{second}</p>
            </div>
        </div>
    )
};
export default AudioRecorder;

{/* {!permission ? (
                        <button onClick={getMicrophonePermission} type="button">
                            Get Microphone
                        </button>
                    ) : null}
                    {permission && recordingStatus === "inactive" ? (
                        <button onClick={startRecording} type="button">
                            Start Recording
                        </button>
                    ) : null}
                    {recordingStatus === "recording" ? (
                        <button onClick={stopRecording} type="button">
                            Stop Recording
                        </button>
                    ) : null}
                     */}