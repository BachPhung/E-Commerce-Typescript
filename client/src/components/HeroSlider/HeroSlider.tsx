import './HeroSlider.scss'
import styled from 'styled-components'
import { SliderData as slides } from '../../data/SliderData'
import { Button } from '@mui/material'
import { ArrowForward } from '@material-ui/icons'
import { useEffect, useRef, useState } from 'react'
const HeroSection = styled.section`
    height: 100vh;
    max-height: 1100px;
    position: relative;
    overflow: hidden;
`

const HeroWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    position: relative;
`

const HeroSlide = styled.div`
    z-index: 1;
    width: 100%;
    height: 100%;
`
const HeroSlider = styled.div`
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    &::before{
        content: '';
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 100vh;
        bottom: 0vh;
        left:0;
        overflow: hidden;
        opacity: 0.4;
        background: linear-gradient(
            0deg,
            rgba(0,0,0,0.2) 0%,
            rgba(0,0,0,0.2) 50%,
            rgba(0,0,0,0.6) 100%,
        );
    }
`
const HeroImage = styled.img`
    position: absolute;
    top:0;
    left: 0;
    width: 100vw;
    height:100vh;
    object-fit: cover;
`
const HeroContent = styled.div`
    margin-left: 20px;
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    max-width: 1600px;
    width: calc(100%-100px);
    color: #fff;
    h1{
        font-size: clamp(1rem,100vw,3rem);
        font-weight: 400;
        text-transform: uppercase;
        text-shadow: 0px 0px 20px rgba(0,0,0,0.4);
        text-align: left;
        margin-bottom: 0.8rem;
    }
`

const HeroDesc = styled.div`
    margin-left: 20px;
    position: absolute;
    bottom: 30px;
    z-index: 10;
    display: flex;
    max-width: 400px;
    text-align: left;
    color: #fff;
    font-size: 40px;
`

export const HeroSliders = () => {
  const [current, setCurrent] = useState(0)
  const length = slides.length
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    const nextSlide = () => {
      setCurrent(curV => (curV === length - 1) ? 0 : curV + 1)
    }
    timeout.current = setTimeout(nextSlide, 5000)
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current)
      }
    }
  }, [current, length])
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }
  return (
    <HeroSection>
      <HeroWrapper>
        {slides.map((slide, index) => {
          return (
            <HeroSlide key={index}>
              {index === current && (
                <HeroSlider>
                  <HeroImage src={slide.image} alt={slide.alt} />
                  <HeroContent>
                    <h1>{slide.title}</h1>
                    <Button className='btn-slider' variant='outlined'>{slide.label}
                      <ArrowForward className='arrow-fw-slider' />
                    </Button>
                  </HeroContent>
                  <HeroDesc>{slide.desc}</HeroDesc>
                </HeroSlider>
              )}
            </HeroSlide>
          )
        })}
      </HeroWrapper>
    </HeroSection>
  )
}
