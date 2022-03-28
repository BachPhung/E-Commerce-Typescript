import { AppBar, Box, Card, CardMedia } from '@mui/material'
import { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import { FetchProduct } from '../../components/ProductList/ProductList'
import { publicRequest } from '../../requestMethod'
import { Add, Remove } from '@material-ui/icons';
import styled from 'styled-components';
import {useDispatch} from 'react-redux'
import {addProduct} from '../../redux/cartSlice'
import './ProductPage.scss'

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

export const ProductPage = () => {
	const dispatch = useDispatch()
	const [product, setProduct] = useState<FetchProduct | null>(null)
	const [quantity, setQuantity] = useState(1)
	const [color, setColor] = useState('')
	const [size, setSize] = useState('')
	const handleAddProduct = () => {
		console.log({...product, quantity, color, size});
		dispatch(addProduct({...product, quantity, color, size}));
	}
	useEffect(() => {
		const getProduct = async () => {
			try {
				const res = await publicRequest.get('/products/623a7f4a289e69175812e21f')
				setProduct(res.data)
				setColor(res.data.color[0])
				setSize(res.data.size[0])
			}
			catch (err) {
			}
		}
		getProduct()
	}, [])
	return (
		product &&
		<div style={{ width: '100vw !important'}}>
			<AppBar position="fixed">
				<Navbar pages='!' />
			</AppBar>
			<Box width={'100%'} display='flex' marginTop={'80px'}>
				<Box flex={2} style={{ display: 'flex' }}>
					{
						product.img.map(img => {
							return (
								< Card >
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
							{product.color.map(c=>
							<span onClick={()=>setColor(c)}>
								<FilterColor className={color === c ? 'selectedColor' : ''} key={c} color={`${c}`}/>
							</span>
							)}
						</Filter>
						<Filter>
							<FilterTitle>Size</FilterTitle>
							<FilterSize onChange={(e)=>setSize(e.target.value)}>
								{product.size.map(s=><FilterSizeOption key={s}>{s}</FilterSizeOption>)}
							</FilterSize>
						</Filter>
					</FilterContainer>
					<AddContainer>
						<AmountContainer>
							<Remove onClick={()=>{quantity===1 ? setQuantity(1) : setQuantity(quantity-1)}} style={{cursor:'pointer'}}/>
							<Amount>{quantity}</Amount>
							<Add onClick={()=> setQuantity(quantity+1)} style={{cursor:'pointer'}}/>
						</AmountContainer>
						<Button onClick={handleAddProduct}>ADD TO CART</Button>
					</AddContainer>
					<Desc>{product.desc.split(',').map(i=>{
						return(
							<li style={{padding:'5px'}}>{i}</li>
						)
					})}</Desc>
				</Box>
				
			</Box>
		</div >
	)
}
