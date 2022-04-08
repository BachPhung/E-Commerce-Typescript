import './Navbar.scss'
import styled from 'styled-components';
import { ShoppingCartOutlined } from '@material-ui/icons';
import { MyModal } from '../Modal/MyModal';
import { Button, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Link } from 'react-router-dom';
import { Badge } from '@material-ui/core';
import { Avatar } from './Avatar';

interface ContainerProps {
  background: string
}
const Container = styled.div<ContainerProps>`
  z-index: 10 !important;
  height: 80px;
  position: absolute;
  background: ${p => p.background};
  width: 100vw;
`
const Wrapper = styled.div`
  width: 100%;
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
  color: string
}
const Logo = styled.h1<LogoProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  color: ${p => p.color};
`
const Right = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 10px;
`
export const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  z-index: 10 !important;
`
interface NavBarProps {
  pages?: string
}
export const Navbar = (props: NavBarProps) => {
  let quantity = useSelector((state: RootState) => state.cart.quantity)
  let user = useSelector((state: RootState) => state.user.currentUser)
  return (
    <Container background={props.pages === 'LandingPage' ? 'none' : 'white'}>
      <Wrapper>
        <Left>
          <Link className='link' to='/products'>
            <Logo color={props.pages === 'LandingPage' ? 'white' : 'black'}>AZAWON</Logo>
          </Link>
        </Left>
        <Right>
          {props.pages !== 'LandingPage' &&
            <MenuItem>
              <Link to='/cart'>
                <IconButton>
                  <Badge badgeContent={quantity} color='secondary' showZero>
                    <ShoppingCartOutlined style={{ color: 'black', fontSize: '28px' }} />
                  </Badge>
                </IconButton>
              </Link>
            </MenuItem>
          }
          {
            !user
              ? <MenuItem><MyModal updateForm={false} /></MenuItem>
              : <MenuItem><Avatar /></MenuItem>
          }
          {
            user && user.isAdmin &&
            <MenuItem>
              <Link className='link' to='/add-product'>
                <Button variant='contained' color='secondary'>Add Product</Button>
              </Link>
            </MenuItem>
          }
          {
            user && user.isAdmin &&
            <MenuItem>
              <Link className='link' to='/user-stats'>
                <Button variant='contained' color='secondary'>Manage Users</Button>
              </Link>
            </MenuItem>
          }
          {
            user && <MenuItem style={{ color: 'black', fontSize: '16px' }}>{`Hi, ${user.first_name} ${user.last_name}`}</MenuItem>
          }
        </Right>
      </Wrapper>
    </Container >
  )
}
