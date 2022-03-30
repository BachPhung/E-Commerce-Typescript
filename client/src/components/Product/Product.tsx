import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ProductInterface {
    _id: string,
    img: string[],
    title:string,
    price:number
}

interface ProductProps {
    product: ProductInterface
}

export const Product = ({product}: ProductProps) => {
    const [img, setImg] = useState(product.img[0])
    return (
        <Card sx={{minWidth:300, maxWidth: 396, mt:4, flex: '1 0 21%', mr:3, position:'relative' }}>
          <Link className='link' to={`/products/${product._id}`}>
          <CardMedia
            onMouseEnter={() => {
              setImg(product.img[1]);
            }}
            onMouseOut={() => {
              setImg(product.img[0]);
            }}
            component="img"
            height="450px"
            image={img}
            alt="clothes"
          />
          <CardContent>
            <Typography gutterBottom variant="caption" fontSize={14} component="div">
              {product.title}
            </Typography>
            <Typography sx={{position:'absolute', bottom:0}} fontSize={16} variant="body2" color="text.secondary">
              {product.price} €
            </Typography>
          </CardContent>
          </Link>
        </Card>
      );
}
