import {useEffect, useState} from 'react'
import styled from 'styled-components'

import { CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ProgressBarContainer = styled.div`
  position: absolute;
  width : 60px;
  height : 60px;
  &:hover{
    cursor : pointer;
  }
`

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}


export default function PlayBar(props){

  const [trackProgress, setTrackProgress] = useState(0)
  useEffect(() =>{
    props.audio.addEventListener("timeupdate", ()=>{
      setTrackProgress(100*Number(props.audio.currentTime)/ Number(props.audio.duration))
    })
  })

  const handleClick = (e) =>{
    let targetX = getOffset(e.currentTarget).left + 30
    let targetY = getOffset(e.currentTarget).top + 30
    let clickX = e.pageX
    let clickY = e.pageY
    let x = clickX - targetX
    let y = targetY - clickY
    // tan theta = y/x
    let angle = Math.atan2(x, y) * (180 / Math.PI)
    angle = (angle < 0)? 360 + angle : angle
    props.audio.currentTime = angle * props.audio.duration/360

  }

  return(
    <ProgressBarContainer onClick={handleClick}>
      <CircularProgressbar value={trackProgress}/>
    </ProgressBarContainer>
  )
}
