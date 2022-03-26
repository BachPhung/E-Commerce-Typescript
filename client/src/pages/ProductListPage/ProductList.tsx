import {
    Box, Drawer, AppBar, Toolbar, List, Typography,
    Divider, ListItem, ListItemText, TextField
} from "@mui/material"
import { Search } from "@material-ui/icons";
import { ChangeEvent, useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { ProductList } from "../../components/ProductList/ProductList";


const drawerWidth = 220;

export const ProductListPage = () => {
    const [filter, setFilter] = useState({
        field: 'new',
        cat: 'view all',
        search:''
    })
    const handleChangeCate = (field: string, cat: string) => {
        setFilter({
            ...filter,
            field: field,
            cat: cat
        })
    }
    const handleChangeInput = (searchInput:string)=>{
        setFilter({
            ...filter,
            search: searchInput
        })
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Navbar pages="!" />
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar sx={{ mt: 5.5 }} />
                <Box sx={{ overflow: 'auto' }}>
                    <Typography variant="h6" fontSize={20} sx={{ ml: 1 }}>
                        New Arrivals
                    </Typography>
                    <List>
                        {['View All', 'Clothes', 'Underwear'].map((text) => (
                            <ListItem button key={text}>
                                <ListItemText onClick={() => handleChangeCate('new', text.toString().toLowerCase())} primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <Typography variant="h6" fontSize={20} sx={{ ml: 1 }}>
                        Men Collection
                    </Typography>
                    <List>
                        {['View All', 'Shoes', 'Hoodie', 'Jeans'].map((text) => (
                            <ListItem button key={text + '0'}>
                                <ListItemText onClick={() => handleChangeCate('men', text.toString().toLowerCase())} primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <Typography variant="h6" fontSize={20} sx={{ ml: 1 }}>
                        Women Collection
                    </Typography>
                    <List>
                        {['View All', 'Shoes', 'Hoodie', 'Jeans'].map((text) => (
                            <ListItem button key={text + '1'}>
                                <ListItemText onClick={() => handleChangeCate('women', text.toString().toLowerCase())} primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Toolbar sx={{ mt: 2.5 }} />
                <Box display='flex' justifyContent='space-between' sx={{ height: '60px', mb: 3  }} >
                    <Typography letterSpacing={2} fontSize={40} variant="h6">{filter.cat.toUpperCase()}</Typography>
                    <div style={{position:"relative"}}>
                    <TextField onChange={((e:ChangeEvent<HTMLInputElement>) => handleChangeInput(e.target.value))} sx={{width:280}} id="search" label="Search" variant="standard" />
                    <Search style={{
                        position:"absolute",
                        bottom:18,
                        right:0,
                        height:'40px',
                        width:'40px',
                        padding: '10px',
                        cursor:'pointer',
                        backgroundColor:'#DFDFDE',
                        borderRadius:'50%'
                    }}/>
                    </div>
                </Box>
                <ProductList filter={filter}/>
            </Box>
        </Box>
    );
}
