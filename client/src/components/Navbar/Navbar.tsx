import './Navbar.scss'
import styled from 'styled-components';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import { ClickAwayListener, Button, Grow, Paper, Popper, MenuItem as MenuItemMUI, MenuList, Badge, Avatar } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import { MyModal } from '../Modal/MyModal';

const Container = styled.div`
    z-index: 10 !important;
    height: 60px;
    position: absolute;
    background: none;
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
const Language = styled.div`
    font-size: 14px;
    cursor: pointer;
`
const Logo = styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 60px;
    color: white;
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

export const Navbar = () => {
  let user = null
  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>BEAUTY</Logo>
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
