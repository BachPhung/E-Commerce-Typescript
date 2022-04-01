export type Filter = {
  field: string,
  cat: string,
  search: string
}

export type ProductListProps = {
  filter: Filter
}

export type FetchProduct = {
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
  quantity: number
}

export type ProductParams = {
  id: string
}