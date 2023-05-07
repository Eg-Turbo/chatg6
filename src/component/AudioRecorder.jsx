import { useState, useRef } from "react";
import classNames from "classnames"
import useToast from "../hooks/useToast"
import { ReactComponent as Mic } from "../assets/mic-svgrepo-com.svg"
import { ReactComponent as Stop } from "../assets/stop-svgrepo-com.svg"
import { useVoiceMutation } from "../redux/api/Voice";
const mimeType = "audio/webm";
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
                    // video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                addToast("error",err.message)


            }
        } else {
            addToast("error","The MediaRecorder API is not supported in your browser.")

        }
    };

    const startRecording = async () => {
        setRecordingStatus("recording");
        //create new Media recorder instance using the stream
        const media = new MediaRecorder(stream,{ "type": mimeType });
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
            


            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = () => {
              const base64data = reader.result.split(",")[1];
              const decodedData = atob(base64data);
              const arrayBuffer = new ArrayBuffer(decodedData.length);
              const uint8Array = new Uint8Array(arrayBuffer);
              for (let i = 0; i < decodedData.length; i++) {
                uint8Array[i] = decodedData.charCodeAt(i);
              }
              const blob = new Blob([arrayBuffer], { type: "video/webm" });
              const formData = new FormData();
              formData.append("file", audioBlob);

              sendVoice(formData).unwrap().then((res)=>{
                console.log("done",res);   
                     showLoader(false)
                    
                    }).catch((err)=>{
                showLoader(false)
                console.log(err);
            })
            };
            const formData = new FormData();
            // console.log({lastModified:1683108868877,lastModifiedDate:"Wed May 03 2023 13:14:28 GMT+0300 (Eastern European Summer Time)",name:"AI_Modules_hameed.webm",...audioBlob,webkitRelativePath:''});
            // console.log({...audioBlob});
            formData.append("file", audioBlob);
            // console.log(formData);
               
            // console.log(audioChunks[0]);

            //creates a playable URL from the blob file.
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl);
            setAudioChunks([]);
        };
    };

    const startCounter = () => {
        let intervalId;

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
        // setCounter(0);
        setSecond("00");
        setMinute("00");
    }
    const handelRecord = () => {

        if (!permission) {
            getMicrophonePermission()
        } else if (permission && recordingStatus === "inactive") {
            showCounter(true)
            startCounter()
            startRecording()
        } else if (recordingStatus === "recording") {
            showCounter(false)
            stopCounter()
            stopRecording()
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