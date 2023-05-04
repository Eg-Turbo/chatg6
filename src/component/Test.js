import React, { useState } from "react";
import AudioRecorder from "./AudioRecorder"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useVoiceMutation } from "../redux/api/Voice";
import Cookies from "js-cookie"




export default function Test() {
    const [sendVoice] = useVoiceMutation()
    // const [duration, setDuration] = useState(0);
    // const [intervalId, setIntervalId] = useState(null);
    // const [mediaRecorder, setMediaRecorder] = useState(null);
    // const [audioChunks, setAudioChunks] = useState([]);
    // const [audioUrl, setAudioUrl] = useState("");

    // const [permission, setPermission] = useState(false);
    // const [recordingStatus, setRecordingStatus] = useState("inactive");
    // const [stream, setStream] = useState(null);
    // const [audio, setAudio] = useState(null);
    // const startRecording = async () => {
    //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    //     const recorder = new MediaRecorder(stream);


    //     recorder.addEventListener("dataavailable", event => {
    //         setAudioChunks(audioChunks => [...audioChunks, event.data]);
    //         console.log("event is", event)
    //     });

    //     recorder.addEventListener("stop", () => {

    //         const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
    //         const url = URL.createObjectURL(audioBlob);

    //         console.log("look at it ", audioChunks);
    //         console.log(audioBlob);
    //         setAudioUrl(url);
    //     });

    //     recorder.start();

    //     const id = setInterval(() => {
    //         setDuration(duration => duration + 1);
    //     }, 1000);

    //     setIntervalId(id);
    //     setMediaRecorder(recorder);
    // };

    // const stopRecording = () => {
    //     mediaRecorder.stop();
    //     clearInterval(intervalId);
    // };
    const [file, setFile] = useState(null);
  //   const token = Cookies.get("token")

  //   const requestOptions = {
  //       method: 'GET',
  //       headers: { 
  //         'Authorization': `token ${token}`,
  //         'Content-Disposition': 'attachment; filename="recording.webm"'
  //       }
  //     };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    // console.log(file);
    formData.append("file", file);
    console.log(file);
    console.log(formData);
    sendVoice(formData).unwrap().then((res)=>{
        console.log("done",res);   
            //  showLoader(false)
             
            }).catch((err)=>{
        // showLoader(false)
        console.log(err);
    })
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
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
const year = parseInt(yearStr);

// // Step 4: Extract the time components (hours, minutes, seconds, AM/PM)
const [hours, minutes, seconds] = time.split(':').map((val) => parseInt(val));

// // Step 5: Adjust the hours based on the AM/PM value
const adjustedHours = ampm === 'AM' ? hours % 12 : (hours % 12) + 12;
  console.log(localDateString);
return `${adjustedHours}:${minutes}`
  }

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
    return (
        // <div>
        //     <button onClick={startRecording}>Start recording</button>
        //     <button onClick={stopRecording}>Stop recording</button>
        //     <div>{duration} seconds</div>
        //     {audioUrl && <audio controls src={audioUrl} />}
        // </div>
        // <AudioRecorder />
      //   <form onSubmit={handleSubmit}>
      //   <input type="file" onChange={handleFileChange} />
      //   <button type="submit">Upload</button>
      // </form>
    //   <div>
    // //   The API date/time in your timezone is: {handelDate("2023-04-27T23:20:13.736252Z")}
    // // </div>
    <div>
    <p>Microphone: {listening ? 'on' : 'off'}</p>
    <button onClick={()=>{SpeechRecognition.startListening()}}>Start</button>
    <button onClick={SpeechRecognition.stopListening}>Stop</button>
    <button onClick={resetTranscript}>Reset</button>
    <p>{transcript}</p>
  </div>
    );
}