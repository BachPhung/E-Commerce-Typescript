import './Navbar.scss'
import styled from 'styled-components';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import { ClickAwayListener, Button, Grow, Paper, Popper, MenuItem as MenuItemMUI, MenuList, Badge, Avatar } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import { MyModal } from '../Modal/MyModal';

interface ContainerProps {
    background:string
}
const Container = styled.div<ContainerProps>`
    z-index: 10 !important;
    height: 80px;
    position: absolute;
    background: ${p=>p.background};
    width: 100vw;
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

interface LogoProps {
    color:string
}
const Logo = styled.h1<LogoProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 60px;
    color: ${p=>p.color};
`
const Right = styled.div`
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    z-index: 10 !important;
`
interface NavBarProps {
    pages: string
}
export const Navbar = (props: NavBarProps) => {
  let user = null
  return (
    <Container background={props.pages==='LandingPage' ? 'none' : 'white'}>
      <Wrapper>
        <Left>
          <Logo color={props.pages==='LandingPage' ? 'white' : 'black'}>BEAUTY</Logo>
        </Left>
        <Right>
            {
              !user && 
              <MenuItem>
                <MyModal/>
              </MenuItem>
            }
        </Right>
      </Wrapper>
    </Container>
  )
}
