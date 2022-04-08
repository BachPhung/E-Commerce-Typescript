import { Box, Button, FormControl, InputLabel, OutlinedInput, TextareaAutosize, AppBar } from "@mui/material";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { userRequest } from '../../requestMethod'
import { Navbar } from '../../components/Navbar/Navbar'
import app from '../../firebase';
import axios from 'axios'
import { useAppDispatch } from '../../redux/hooks'
import {addNewProduct} from '../../redux/productSlice'


interface FileType extends File {
  preview?: string
}

const previewCard = {
  height: '500px',
  width: '500px',
  backgroundColor: '#EBD8C3',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const maxImagesUpload = 2 // Maximum images allowed to upload

export const AddProductPage = () => {
  const dispatch = useAppDispatch()
  const initialValuesState = {
    title: '',
    price: '',
    desc: '',
    size: '',
    color: '',
    categories: ''
  }
  const [values, setValues] = useState(initialValuesState);
  const [uploadFiles, setUploadFiles] = useState<FileType[]>([])
  const [notification, setNotification] = useState({
    status: true,
    mess: ''
  })
  const reinitializeStates = () => {
    setValues(initialValuesState)
    setUploadFiles([])
    setNotification({
      status: true,
      mess: ''
    })
  }

  const storage = getStorage(app)
  const handleChange = (prop: string) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handlePreviewAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const length: number = e.target.files?.length || 0
    const files = e.target.files as FileList
    if (files) {
      for (let i = 0; i < length; i++) {
        const file = files.item(i) as FileType
        if (file) {
          file.preview = (URL.createObjectURL(file));
          setUploadFiles(preV => preV.concat(file))
        }
      }
    }
  }

  const handleAddProduct = async (e: SyntheticEvent) => {
    e.preventDefault()

    try {
      clearTimeout()
      const snapshots = await Promise.all(uploadFiles.map((file) => {
        const fileName: string = new Date().getTime().toString() + file.name
        const imageRef = ref(storage, fileName)
        return uploadBytes(imageRef, file)
      }))
      const urls = await Promise.all(snapshots.map(snapshot => {
        return getDownloadURL(snapshot.ref)
      }))

      const productInfo = {
        title: values.title,
        desc: values.desc,
        img: urls,
        categories: values.categories.split(','),
        size: values.size.split(','),
        color: values.size.split(','),
        price: values.price
      }
      if (productInfo.img.length > maxImagesUpload) {
        throw new Error('You are only allowed to upload maximum 2 pictures')
      }
      const res = await userRequest.post('/products', productInfo)
      dispatch(addNewProduct(res.data))
      setNotification({
        mess: 'Add product success',
        status: true
      })
      setTimeout(reinitializeStates, 5000)
    }
    catch (err) {
      if (axios.isAxiosError(err)) {
        setNotification({
          mess: err.response?.data.error,
          status: false
        })
        return
      }
      else if (err instanceof Error) {
        setNotification({
          mess: err.message,
          status: false
        })
      }
    }
  }

  return (
    <div style={{ width: '100vw !important' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Navbar />
      </AppBar>
    <Box display='flex' >
      <Box display={'flex'} flexDirection='column' justifyContent={'center'} flex={1} height='100vh' className="left">
        <div className="header-form">
          <div className="form-title">Add Product</div>
        </div>
        <form onSubmit={e => handleAddProduct(e)}>
          <div>
            <FormControl sx={{ m: 1, width: '99%' }} variant="outlined">
              <InputLabel htmlFor="outlined-title">Title*</InputLabel>
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
              <InputLabel htmlFor="outlined-price">Price*</InputLabel>
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
              <InputLabel htmlFor="outlined-categories">Categories*</InputLabel>
              <OutlinedInput
                value={values.categories}
                onChange={handleChange('categories')}
                required
                inputProps={{
                  'aria-label': 'categories',
                }}
                label="Categories"
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
            <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  component="label"
                >
                  Upload File
                  <input
                    type="file"
                    hidden
                    multiple
                    onChange={handlePreviewAvatar}
                  />
                </Button>
              </div>
            </div>
            <div style={{
              textAlign: 'center',
              color: 'red'
            }}>Hint: Separate each node in a field by comma (,)
            </div>
          </div>
          <div>
          </div>
          <div className="btn-wrapper">
            <div className="sign-in-btn">
              <Button type="submit" className="btn">Add Product</Button>
            </div>
          </div>
          {
            notification.mess.length !== 0
            && <div color={notification.status ? 'green' : 'false'}>
              {notification.mess}
            </div>
          }
        </form>
      </Box>
      <Box flex={1.6} className="right" display='flex' justifyContent='space-between' alignItems='center' padding='0 20px' margin='0 20px' borderLeft='2px solid black'>
        {
          uploadFiles.map(file => {
            return (
              <div key={file.name} style={previewCard}>
                <img style={{ height: '480px', width: '480px', borderRadius: '50%', objectFit: 'cover' }} src={file.preview || `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSuQk0VnRgZ8KD4TnUDBYoAuDw2uPE2qVeDV2XBU9WaNQ5Ihz1CxX_gMMrBHH18BhHz_Y&usqp=CAU`}></img>
              </div>
            )
          })
        }
      </Box>
    </Box>
    </div>
  )
}
