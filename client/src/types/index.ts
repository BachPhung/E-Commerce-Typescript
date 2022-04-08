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

export type FetchUser = {
  _id: string,
  first_name: string,
  last_name: string,
  username: string,
  isAdmin: boolean,
  isBanned: boolean
}

export interface CartProduct extends FetchProduct {
  quantity: number
}

export type ProductParams = {
  id: string
}

export interface ModalSignFormProps {
  handleChangeForm: () => void
}

export interface SignUpForm {
  first_name: string,
  last_name: string,
  username: string,
  password: string,
  repeatPassword?: string,
  showPassword?: boolean
}