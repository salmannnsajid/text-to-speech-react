import React, { useEffect, useState } from "react";

function App() {
  const [speechText, setSpeechText] = useState("");
  const [speechRate, setSpeechRate] = useState("1");
  const [speechPitch, setSpeechPicth] = useState("1");
  const [speechVoices, setSpeechVoices] = useState([]);
  const [speechVolume, setSpeechVolume] = useState("1");
  const [currentAction, setCurrentAction] = useState("cancel");
  const [speechVoicesToShow, setSpeechVoicesToShow] = useState([]);
  const [speech, setSpeech] = useState(new SpeechSynthesisUtterance());

  const pitchValueHandler = (e) => {
    speech.pitch = e.target.value;
    setSpeech(speech);
    window.speechSynthesis.cancel();
    setCurrentAction("cancel");
    setSpeechPicth(e.target.value);
  };

  const rateChangeHandler = (e) => {
    speech.rate = e.target.value;
    setSpeech(speech);
    window.speechSynthesis.cancel();
    setCurrentAction("cancel");
    setSpeechRate(e.target.value);
  };

  const volumeHandler = (e) => {
    speech.volume = e.target.value;
    setSpeech(speech);
    window.speechSynthesis.cancel();
    setCurrentAction("cancel");
    setSpeechVolume(e.target.value);
  };

  const handleSelect = (e) => {
    speech.voice = speechVoices[e.target.value];
    window.speechSynthesis.cancel();
    setCurrentAction("cancel");
    setSpeech(speech);
  };

  useEffect(() => {
    window.speechSynthesis.cancel();
    speech.leng = "en";
  }, []);

  window.speechSynthesis.onvoiceschanged = () => {
    let voicesArray = window.speechSynthesis.getVoices();
    let data = voicesArray.map((item) => {
      return { name: item.name };
    });

    setSpeechVoicesToShow([...data]);
    setSpeechVoices([...voicesArray]);
  };

  return (
    <div>
      <h1 className="text-light text-center">Text to Speech</h1>
      <div className="options-wrapper">
        <div>
          <p className="lead text-light mt-4 mb-0">Select Voice</p>
          <select
            className="form-select bg-secondary text-light"
            onChange={handleSelect}
          >
            {speechVoicesToShow.length
              ? speechVoicesToShow.map((item, i) => {
                  return (
                    <option key={i} value={i}>
                      {item.name}
                    </option>
                  );
                })
              : []}
          </select>
        </div>
        <div className="d-flex text-light">
          <div>
            <p className="lead">Volume</p>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={speechVolume}
              onChange={volumeHandler}
            />
            <span className="ms-2">{speechVolume}</span>
          </div>
          <div className="mx-5">
            <p className="lead">Rate</p>
            <input
              type="range"
              min="0.1"
              max="10"
              value={speechRate}
              step="0.1"
              onChange={rateChangeHandler}
            />
            <span className="ms-2">{speechRate}</span>
          </div>
          <div>
            <p className="lead">Pitch</p>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={speechPitch}
              onChange={pitchValueHandler}
            />
            <span className="ms-2">{speechPitch}</span>
          </div>
        </div>
      </div>
      <textarea
        className="form-control bg-dark text-light mt-5"
        cols="30"
        rows="10"
        value={speechText}
        placeholder="Type here..."
        onChange={(e) => setSpeechText(e.target.value)}
      />
      <div className="mb-5">
        <button
          className="btn btn-success mt-5 me-3"
          onClick={() => {
            speech.text = speechText;
            window.speechSynthesis.speak(speech);
            setCurrentAction("start");
          }}
        >
          Start
        </button>
        <button
          className="btn btn-warning mt-5 me-3"
          onClick={() => {
            setCurrentAction("pause");
            window.speechSynthesis.pause();
          }}
        >
          Pause
        </button>
        <button
          className="btn btn-info mt-5 me-3"
          onClick={() => {
            setCurrentAction("resume");
            window.speechSynthesis.resume();
          }}
        >
          Resume
        </button>
        <button
          className="btn btn-danger mt-5 me-3"
          onClick={() => {
            setCurrentAction("cancel");
            window.speechSynthesis.cancel();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default App;
