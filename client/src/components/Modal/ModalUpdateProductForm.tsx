import { Box, Button, FormControl, InputLabel, OutlinedInput, TextareaAutosize } from "@mui/material";
import { Lock } from "@material-ui/icons";
import './ModalForm.scss'
import { useState } from "react";
import { FetchProduct, ProductParams } from "../../types";
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { userRequest } from "../../requestMethod";
import { updateProduct } from "../../redux/productSlice";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 700,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 40,
  p: 4,
};



export const ModalUpdateProductForm = () => {
  const id: string | undefined = useParams<ProductParams>().id
  const dispatch = useDispatch()
  const product = useSelector((state: RootState) => state.product.products.filter(p => p._id === id)[0])
  const [values, setValues] = useState({
    title: product.title,
    price: product.price,
    desc: product.desc,
    size: product.size.toString(),
    color: product.color.toString()
  });

  const handleChange = (prop: string) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleUpdate = async (updatedInfo: Partial<FetchProduct>) => {
    try {
      const res = await userRequest.put(`/products/${id}`, updatedInfo)
      const updatedProduct = res.data
      dispatch(updateProduct({ updatedProduct, id }))
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <Box sx={style}>
      <div className="header-form">
        <div className="icon-wrapper">
          <Lock />
        </div>
        <div className="form-title">Update Product</div>
      </div>
      <form onSubmit={e => e.preventDefault()}>
        <div>
          <FormControl sx={{ m: 1, width: '99%' }} variant="outlined">
            <InputLabel htmlFor="outlined-username">Title*</InputLabel>
            <OutlinedInput
              value={values.title}
              onChange={handleChange('title')}
              required
              inputProps={{
                'aria-label': 'title',
              }}
              label="Title"
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '99%' }} variant="outlined">
            <InputLabel htmlFor="outlined-username">Price*</InputLabel>
            <OutlinedInput
              value={values.price}
              onChange={handleChange('price')}
              required
              inputProps={{
                'aria-label': 'price',
              }}
              label="Price"
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '99%' }} variant="outlined">
            <InputLabel htmlFor="outlined-username">Color*</InputLabel>
            <OutlinedInput
              value={values.color}
              onChange={handleChange('color')}
              required
              inputProps={{
                'aria-label': 'color',
              }}
              label="Color"
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '99%' }} variant="outlined">
            <InputLabel htmlFor="outlined-username">Size*</InputLabel>
            <OutlinedInput
              value={values.size}
              onChange={handleChange('size')}
              required
              inputProps={{
                'aria-label': 'size',
              }}
              label="Size"
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '99%' }} variant="outlined">
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Description"
              style={{ maxWidth: '100%', maxHeight: '120px', minHeight: '100px', borderRadius: '10px', fontSize: '18px' }}
              value={values.desc}
              onChange={handleChange('desc')}
            />
          </FormControl>
          <div style={{
            textAlign: 'center',
            color: 'red'
          }}>Hint: Separate each node in a field by comma (,)</div>
        </div>
        <div>
        </div>
        <div className="btn-wrapper">
          <div className="sign-in-btn">
            <Button onClick={() => handleUpdate({
              ...values,
              size: values.size.split(','),
              color: values.color.split(',')
            })} type="submit" className="btn">Update Product</Button>
          </div>
        </div>
      </form>
    </Box>
  )
}
