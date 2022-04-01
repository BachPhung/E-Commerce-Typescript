import styled from 'styled-components';

export const Title = styled.h1`
	font-size: 35px;
	font-weight: 400;
`
export const Desc = styled.ul`
	padding-top: 30px;
	padding-left: 25px;
	list-style: square;
	font-size: 20px;
	margin: 20px 0;
`
export const Price = styled.span`
	font-weight: 300;
	font-size: 40px;
`
export const FilterContainer = styled.div`
	width: 50%;
	margin: 30px 0;
	display: flex;
	justify-content: space-between;
`
export const Filter = styled.div`
	display: flex;
	align-items: center;
`
export const FilterTitle = styled.span`
	font-size: 20px;
	font-weight: 200;
`
export const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  border: 0.5px solid black;
  cursor: pointer;
`;
export const FilterSize = styled.select`
	margin-left: 10px;
	padding: 8px;
	font-size: 16px;
`
export const FilterSizeOption = styled.option`
`
export const AddContainer = styled.div`
	width: 50%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`
export const AmountContainer = styled.div`
	display: flex;
	align-items: center;
	font-weight: 700;
`
export const Amount = styled.span`
	width: 30px;
	height: 30px;
	border-radius: 10px;
	border: 1px solid teal;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 5px;
`
export const Button = styled.button`
	cursor: pointer;
	padding: 15px;
	border: 1px solid teal;
	background-color: white;
	font-weight: 600;
	&:hover{
		background-color: #f8f4f4;
	}
`
