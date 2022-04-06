import { useState, useEffect } from "react";
import { ExpandLess } from "@material-ui/icons";
import { Button } from "@mui/material";



export const ScrollToTop = () => {
  const [show, setShow] = useState(false)
  const showBelow = 250   // set the offside to show button
  const handleScroll = () => {
    if (window.scrollY > showBelow)
      setShow(true)
    else
      setShow(false)
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })
  const handleClick = () => {
    window[`scrollTo`]({ top: 0, behavior: 'smooth' })
  }
  return (
    <div>
      {
        show &&
        <Button onClick={handleClick} style={{
          width: "50px",
          height: "50px",
          minWidth: "40px",
          minHeight: "40px",
          borderRadius:'50%',
          zIndex: 10,
          position: "fixed",
          bottom: '2vh',
          backgroundColor: 'darkgrey',
          color: 'white',
          fontSize: '20px',
          right: '30px',
        }}>
          <ExpandLess style={{
            width:'20px',
            height:'20px'
          }}/>
        </Button>
      }
    </div>
  )
}
