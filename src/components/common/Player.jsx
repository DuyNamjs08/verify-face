import React, { useEffect, useRef, useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import Button from './Button';

const AudioPlayer = ({ slug, togglePlay, index, isCurrent }) => {
  const audioRef = useRef();

  const [duration, setDuration] = useState();
  const [curTime, setCurTime] = useState();
  const [playing, setPlaying] = useState(false);
  const [clickedTime, setClickedTime] = useState();

  useEffect(() => {
    const audio = audioRef.current;

    // state setters
    const setAudioData = () => {
      setDuration(audio.duration);
      setCurTime(audio.currentTime);
    };

    const setAudioTime = () => setCurTime(audio.currentTime);

    // DOM listeners: update React state on DOM events
    // audio.addEventListener('loadeddata', setAudioData);
    // audio.addEventListener('timeupdate', setAudioTime);

    if (clickedTime && clickedTime !== curTime) {
      audio.currentTime = clickedTime;
      setClickedTime(null);
    }

    // effect cleanup
    return () => {
      // audio.removeEventListener('loadeddata', setAudioData);
      // audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, [clickedTime, curTime]);

  return (
    <div style={{ position: 'relative' }}>
      <audio id={slug} ref={audioRef} controls>
        <source src={slug} />
      </audio>
      <div className='controls' style={{ position: 'absolute', left: 10, top: 10 }}>
        {playing && isCurrent ? (
          <Button
            className='audio-controls'
            onClick={() => {
              setPlaying(false);
              togglePlay(slug, index);
            }}
          >
            <FaPause />
          </Button>
        ) : (
          <Button
            className='audio-controls'
            onClick={() => {
              setPlaying(true);
              togglePlay(slug, index);
            }}
          >
            <FaPlay />
          </Button>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
