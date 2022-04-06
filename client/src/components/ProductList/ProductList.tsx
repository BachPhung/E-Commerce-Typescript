import { Product } from "../Product/Product"
import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { fetchProducts } from "../../apiCalls"
import { FetchProduct, ProductListProps } from "../../types"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"

export const ProductList = ({ filter }: ProductListProps) => {
  const products = useAppSelector(state => state.product.products)
  const dispatch = useAppDispatch()
  const [filteredProducts, setFilteredProducts] = useState<FetchProduct[]>([])
  useEffect(() => {
    const getProducts = async () => {
      await fetchProducts(dispatch)
    }
    getProducts()
  }, [dispatch])
  useEffect(() => {
    if (filter.field === 'new') {
      if (filter.cat !== 'view all') {
        console.log('Process filter')
        setFilteredProducts(
          products.filter((product) => {
            const lowerCase = product.categories.map(cat => cat.toLowerCase())
            const filterArr = ['shoes']
            return !filterArr.every(
              ai => lowerCase.includes(ai))
              && product.title.toLowerCase().includes(filter.search.toLowerCase())
          })
        )
      }
      else {
        setFilteredProducts(products.filter(product => product.title.toLowerCase().includes(filter.search.toLowerCase())))
      }
    }
    else if (filter.cat !== 'view all' && filter.field !== 'new') {
      setFilteredProducts(
        products.filter((product) => {
          const lowerCase = product.categories.map(cat => cat.toLowerCase())
          const filterArr = [filter.cat, filter.field]
          return filterArr.every(ai => lowerCase.includes(ai)) && product.title.toLowerCase().includes(filter.search.toLowerCase())
        })
      )
    }
    else {
      setFilteredProducts(
        products.filter((product) => {
          const lowerCase = product.categories.map(cat => cat.toLowerCase())
          const filterArr = [filter.field]
          return filterArr.every(ai => lowerCase.includes(ai)) && product.title.toLowerCase().includes(filter.search.toLowerCase())
        })
      )
    }
  }, [filter, products])
  return (
    <Box flexWrap="wrap" display='flex' justifyContent='flex-start' sx={{ minHeight: '400px', mt: 3 }} >
      {
        filteredProducts.map(product => {
          return (
            <Product key={product._id} product={product} />
          )
        })
      }
    </Box>
  )
}
