import { AppBar, Box, Card, CardMedia, Button as ButtonMUI } from '@mui/material'
import { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import { ProductParams } from '../../types'
import { userRequest } from '../../requestMethod'
import { Add, Remove } from '@material-ui/icons';
import { addProduct, setCart } from '../../redux/cartSlice'
import './ProductPage.scss'
import { useParams, useNavigate } from 'react-router-dom'
import { MyModal } from '../../components/Modal/MyModal'
import {
  Title, Desc, Price, FilterContainer, Filter, FilterTitle,
  FilterColor, FilterSize, FilterSizeOption, AddContainer, AmountContainer, Amount, Button
} from './ProductPageComponent'
import { addProductCall, fetchProduct } from '../../apiCalls'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'

export const ProductPage = () => {
  let navigate = useNavigate()
  let products = useAppSelector(state => state.product.products)
  const id: string | undefined = useParams<ProductParams>().id
  const dispatch = useAppDispatch()
  let state = useAppSelector(state => state)
  let user = useAppSelector(state => state.user.currentUser)
  const [product, setProduct] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [color, setColor] = useState('')
  const [size, setSize] = useState('')
  useEffect(() => {
    const getProduct = async () => {
      if (products.length > 0) {
        const product = products.filter(p => p._id === id)[0]
        setProduct(product._id)
        setColor(product.color[0])
        setSize(product.size[0])
      }
      else {
        try {
          const fetchedProduct = await fetchProduct(id)
          setProduct(fetchedProduct._id)
          setColor(fetchedProduct.color[0])
          setSize(fetchedProduct.size[0])
        }
        catch (err) {
          console.log(err);
        }
      }
    }
    getProduct()
  }, [id, products])

  // ADD PRODDUCT TO CART
  const handleAddProduct = async () => {
    if(!user){
      dispatch(addProduct({ product, quantity, color, size, price: products.filter(p=>p._id === product)[0].price }));
    }
    else{
      let price = products.filter(p=>p._id === product)[0].price
      try{
        const res = await addProductCall(state.cart.cartId, product, size, color, price)
        dispatch(setCart(res))
        dispatch(addProduct({}))
      }
      catch(err){
        console.log(err);
      }
    }
  }

  // REMOVE PRODUCT FROM DATABASE
  const handleDeleteProduct = async () => {
    try {
      await userRequest.delete(`/products/${product}`)
      navigate('/products')
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div style={{ width: '100vw !important' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Navbar />
      </AppBar>
      <Box width={'100%'} display='flex' marginTop={'80px'}>
        <Box flex={2} style={{ display: 'flex' }}>
          {
            products.filter(p => p._id === id)[0].img.map(img => {
              return (
                < Card key={img} >
                  <CardMedia
                    sx={{ height: "100vh" }}
                    component="img"
                    image={img}
                    alt="clothes"
                  />
                </Card>
              )
            })
          }
        </Box>
        <Box flex={1} padding={'200px 0 0 60px'}>
          <Title>{products.filter(p => p._id === id)[0].title}</Title>
          <Price>€ {products.filter(p => p._id === id)[0].price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {products.filter(p => p._id === id)[0].color.map(c =>
                <span key={c + Math.random()} onClick={() => setColor(c)}>
                  <FilterColor className={color === c ? 'selectedColor' : ''} key={c} color={`${c}`} />
                </span>
              )}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {products.filter(p => p._id === id)[0].size.map(s => <FilterSizeOption key={s}>{s}</FilterSizeOption>)}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => { quantity === 1 ? setQuantity(1) : setQuantity(quantity - 1) }} style={{ cursor: 'pointer' }} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => setQuantity(quantity + 1)} style={{ cursor: 'pointer' }} />
            </AmountContainer>
            <Button onClick={handleAddProduct}>ADD TO CART</Button>
          </AddContainer>
          <Desc>{products.filter(p => p._id === id)[0].desc.split(',').map(i => {
            return (
              <li key={i} style={{ padding: '5px' }}>{i}</li>
            )
          })}
          </Desc>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '15px' }}>
              {
                user && user.isAdmin && <ButtonMUI onClick={() => {
                  if (window.confirm('Do you wanna delete this product')) {
                    handleDeleteProduct()
                  }
                }} variant='contained' color='secondary'>Remove Product</ButtonMUI>
              }
            </div>
            <div>
              {
                user && user.isAdmin && <MyModal updateForm={true} />
              }
            </div>
          </div>
        </Box>
      </Box>
    </div >
  )
}
