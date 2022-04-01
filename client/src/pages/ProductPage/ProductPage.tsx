import { AppBar, Box, Card, CardMedia, Button as ButtonMUI } from '@mui/material'
import { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import { FetchProduct, ProductParams } from '../../types'
import { publicRequest, userRequest } from '../../requestMethod'
import { Add, Remove } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../redux/cartSlice'
import './ProductPage.scss'
import { useParams, useNavigate } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { MyModal } from '../../components/Modal/MyModal'
import {
  Title, Desc, Price, FilterContainer, Filter, FilterTitle,
  FilterColor, FilterSize, FilterSizeOption, AddContainer, AmountContainer, Amount, Button
} from './ProductPageComponent'

export const ProductPage = () => {
  let navigate = useNavigate()
  let products = useSelector((state: RootState) => state.product.products)
  const id: string | undefined = useParams<ProductParams>().id
  const dispatch = useDispatch()
  let user = useSelector((state: RootState) => state.user.currentUser)
  const [product, setProduct] = useState<FetchProduct | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [color, setColor] = useState('')
  const [size, setSize] = useState('')
  useEffect(() => {
    const getProduct = async () => {
      if (products.length > 0) {
        setProduct(products.filter(p => p._id === id)[0])
      }
      else {
        try {
          const res = await publicRequest.get(`/products/${id}`)
          setProduct(res.data)
          setColor(res.data.color[0])
          setSize(res.data.size[0])
        }
        catch (err) {
          console.log(err);
        }
      }
    }
    getProduct()
  }, [id,products])

  // ADD PRODDUCT TO CART
  const handleAddProduct = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  }

  // REMOVE PRODUCT FROM DATABASE
  const handleDeleteProduct = async () => {
    try {
      await userRequest.delete(`/products/${product?._id}`)
      navigate('/products')
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    product &&
    <div style={{ width: '100vw !important' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Navbar />
      </AppBar>
      <Box width={'100%'} display='flex' marginTop={'80px'}>
        <Box flex={2} style={{ display: 'flex' }}>
          {
            product.img.map(img => {
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
          <Title>{product.title}</Title>
          <Price>€ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color.map(c =>
                <span key={c + Math.random()} onClick={() => setColor(c)}>
                  <FilterColor className={color === c ? 'selectedColor' : ''} key={c} color={`${c}`} />
                </span>
              )}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size.map(s => <FilterSizeOption key={s}>{s}</FilterSizeOption>)}
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
          <Desc>{product.desc.split(',').map(i => {
            return (
              <li key={i} style={{ padding: '5px' }}>{i}</li>
            )
          })}
          </Desc>
          {
            user && user.isAdmin && <ButtonMUI onClick={() => {
              if (window.confirm('Do you wanna delete this product')) {
                handleDeleteProduct()
              }
            }} variant='contained' color='secondary'>Remove Product</ButtonMUI>
          }
          {
            user && user.isAdmin && <MyModal updateForm={true} />
          }
        </Box>
      </Box>
    </div >
  )
}
