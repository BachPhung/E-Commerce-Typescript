import { Product } from "../Product/Product"
import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { publicRequest } from "../../requestMethod"
import { Link } from "react-router-dom"

interface Filter {
  field: string,
  cat: string,
  search: string
}

interface ProductListProps {
  filter: Filter
}

export interface FetchProduct {
  _id: string,
  categories: string[],
  img: string[],
  title: string,
  price: number,
  color: string[],
  size: string[],
  desc: string
}

export interface CartProduct extends FetchProduct {
  quantity: number,
}
export const ProductList = ({ filter }: ProductListProps) => {
  const [products, setProducts] = useState<FetchProduct[]>([])
  const [filteredProducts, setFilteredProducts] = useState<FetchProduct[]>([])
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get('/products')
        setProducts(res.data)
        setFilteredProducts(res.data)
      }
      catch (err) {
        console.log(err)
      }
    }
    getProducts()
  }, [])
  useEffect(() => {
    if (filter.field === 'new') {
      if (filter.cat !== 'view all') {
        setFilteredProducts(
          products.filter((product) => {
            const lowerCase = product.categories.map(cat => cat.toLowerCase())
            const filterArr = ['shoes']
            return !filterArr.every(ai => lowerCase.includes(ai)) && product.title.toLowerCase().includes(filter.search.toLowerCase())
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
