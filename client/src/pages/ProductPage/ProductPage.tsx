import { AppBar, Box, Card, CardMedia, Button as ButtonMUI } from '@mui/material'
import { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import { FetchProduct } from '../../components/ProductList/ProductList'
import { publicRequest, userRequest } from '../../requestMethod'
import { Add, Remove } from '@material-ui/icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../redux/cartSlice'
import './ProductPage.scss'
import { useParams, useNavigate } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { MyModal } from '../../components/Modal/MyModal'

const Title = styled.h1`
	font-size: 35px;
	font-weight: 400;
`
const Desc = styled.ul`
	padding-top: 30px;
	padding-left: 25px;
	list-style: square;
	font-size: 20px;
	margin: 20px 0;
`
const Price = styled.span`
	font-weight: 300;
	font-size: 40px;
`
const FilterContainer = styled.div`
	width: 50%;
	margin: 30px 0;
	display: flex;
	justify-content: space-between;
`
const Filter = styled.div`
	display: flex;
	align-items: center;
`
const FilterTitle = styled.span`
	font-size: 20px;
	font-weight: 200;
`
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  border: 0.5px solid black;
  cursor: pointer;
`;
const FilterSize = styled.select`
	margin-left: 10px;
	padding: 8px;
	font-size: 16px;
`
const FilterSizeOption = styled.option`
`
const AddContainer = styled.div`
	width: 50%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`
const AmountContainer = styled.div`
	display: flex;
	align-items: center;
	font-weight: 700;
`
const Amount = styled.span`
	width: 30px;
	height: 30px;
	border-radius: 10px;
	border: 1px solid teal;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 5px;
`
const Button = styled.button`
	cursor: pointer;
	padding: 15px;
	border: 1px solid teal;
	background-color: white;
	font-weight: 600;
	&:hover{
		background-color: #f8f4f4;
	}
`

type ProductParams = {
  id: string
}

export const ProductPage = () => {
  let navigate = useNavigate()
  const id: string | undefined = useParams<ProductParams>().id
  const dispatch = useDispatch()
  let user = useSelector((state: RootState) => state.user.currentUser)
  const [product, setProduct] = useState<FetchProduct | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [color, setColor] = useState('')
  const [size, setSize] = useState('')
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/${id}`)
        setProduct(res.data)
        setColor(res.data.color[0])
        setSize(res.data.size[0])
      }
      catch (err) {
      }
    }
    getProduct()
  }, [id])
 
  const handleAddProduct = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  }
  const handleDeleteProduct = async () => {
    try{
      await userRequest.delete(`/products/${product?._id}`)
      navigate('/products')
    }
    catch(err){
      console.log(err)
    }
  }
  const handleUpdateProduct = async (updatedInfo: Partial<FetchProduct>) => {
    try{
      const res = await userRequest.put(`/products/${product?._id}`, updatedInfo)
      setProduct(res.data)
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    product &&
    <div style={{ width: '100vw !important' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Navbar  />
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
            user && user.isAdmin && <ButtonMUI onClick={()=>{
              if(window.confirm('Do you wanna delete this product')){
                handleDeleteProduct()
              }
            }} variant='contained' color='secondary'>Remove Product</ButtonMUI>
          }
          {
            user && user.isAdmin && <MyModal handleUpdate={handleUpdateProduct} updateForm={true} productInfo={product}/>
          }
        </Box>
      </Box>
    </div >
  )
}
