import { AppBar, Box, Button, Divider, Typography } from '@mui/material'
import { Navbar } from '../../components/Navbar/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { addQuantity, decreaseQuantity } from '../../redux/cartSlice'
import styled from 'styled-components'
import { RootState } from '../../redux/store'
import { Add, Remove } from '@material-ui/icons';
import { useAppSelector } from '../../redux/hooks'

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`
const Image = styled.img`
    width: 200px;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductName = styled.span`
    
`

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
`
const ProductSize = styled.span`
    
`
const PriceDetails = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const ProductAmount = styled.span`
    font-size: 24px;
    margin: 5px;
`
const ProductPrice = styled.span`
    font-size: 30px;
    font-weight: 200;
`

const SummaryItem = styled.div`
    margin: 35px 0;
    display: flex;
    justify-content: space-between;   
`
type SummaryItemTextProps = {
  type?: string
}
const SummaryItemText = styled.span`
    font-weight: ${(p: SummaryItemTextProps) => p.type === 'total' ? "500" : "300"};
    font-size:${(p: SummaryItemTextProps) => p.type === 'total' ? "28px" : "22px"};
`
const SummaryItemPrice = styled.span`
    font-weight: ${(p: SummaryItemTextProps) => p.type === 'total' ? "500" : "300"};
    font-size:${(p: SummaryItemTextProps) => p.type === 'total' ? "28px" : "22px"};
`

export const CartPage = () => {
  const cart = useSelector((state: RootState) => state.cart)
  const productStore = useAppSelector(state=>state.product)
  const productIds = cart.products.map(p=> p.product)
  const products = productStore.products.filter(p=>{
    return productIds.includes(p._id)});
  const dispatch = useDispatch()
  const handleAddQuantity = (product:string, size:string, color:string, price: number) => {
    dispatch(addQuantity({product, size, color, price}))
  }
  const handleDescreaseQuantity = (product:string, size:string, color:string, price: number) => {
    dispatch(decreaseQuantity({product, size, color, price}))
  }
  return (
    <div>
      <AppBar position='fixed'>
        <Navbar pages='!' />
      </AppBar>
      <Box display='flex' justifyContent='space-between' padding='20px' marginTop={'80px'}>
        <Box flex={3}>
          {productIds.map((id,index) => {
            return products.filter(p=>p._id === id).map(product=>{
              return (
                <Box key={product._id + Math.random()} display='flex' justifyContent='space-between' borderBottom={'1px solid black'} marginBottom={'50px'}>
                  <Box flex={2}>
                    <ProductDetail>
                      <Image src={product.img[0]} />
                      <Details>
                        <ProductName><b>Product: </b>{product.title}</ProductName>
                        <ProductColor color={`${cart.products[index].color}`} />
                        <ProductSize><b>Size: </b>{cart.products[index].size}</ProductSize>
                      </Details>
                    </ProductDetail>
                  </Box>
                  <Box flex={2}>
                    <PriceDetails>
                      <ProductAmountContainer>
                        <Add style={{ cursor: "pointer" }} onClick={() => handleAddQuantity(id, cart.products[index].size, cart.products[index].color, cart.products[index].price)}></Add>
                        <ProductAmount>{cart.products[index].quantity}</ProductAmount>
                        <Remove style={{ cursor: "pointer" }} onClick={() => handleDescreaseQuantity(id, cart.products[index].size, cart.products[index].color, cart.products[index].price)} />
                      </ProductAmountContainer>
                      <ProductPrice>€ {(cart.products[index].price * cart.products[index].quantity ).toFixed(2)}</ProductPrice>
                    </PriceDetails>
                  </Box>
                </Box>
              )
            })
            
          })}
        </Box>
        <Box flex={1} border='0.5px solid lightgray' borderRadius='10px' padding={'20px'} height={'80vh'}>
          <Typography variant='h4' fontWeight={'200'}>ORDER SUMMARY</Typography>
          <SummaryItem>
            <SummaryItemText>Subtotal</SummaryItemText>
            <SummaryItemPrice>{cart.total}</SummaryItemPrice>
          </SummaryItem>
          {cart.total !== 0 &&
            <>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>-5.90</SummaryItemPrice>
              </SummaryItem>
            </>
          }
          <Divider />
          <SummaryItem>
            <SummaryItemText type='total'>Total</SummaryItemText>
            <SummaryItemPrice type='total'>€ {cart.total}</SummaryItemPrice>
          </SummaryItem>
          <Button variant='contained'>CHECKOUT NOW</Button>
        </Box >
      </Box>

    </div>
  )
}
