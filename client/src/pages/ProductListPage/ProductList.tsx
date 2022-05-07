import {
  Box, Drawer, AppBar, Toolbar, List, Typography,
  Divider, ListItem, ListItemText, TextField, IconButton
} from "@mui/material"
import { Search } from "@material-ui/icons";
import MenuIcon from '@mui/icons-material/Menu';
import { ChangeEvent, useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { ProductList } from "../../components/ProductList/ProductList";
import { ScrollToTop } from "../../components/ScrollToTop/scroll";
import './ProductList.scss'

const drawerWidth = 200;

export const ProductListPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [filter, setFilter] = useState({
    field: 'new',
    cat: 'view all',
    search: ''
  })
  const handleChangeCate = (field: string, cat: string): void => {
    setFilter({
      ...filter,
      field: field,
      cat: cat
    })
  }
  const handleChangeInput = (searchInput: string): void => {
    setFilter({
      ...filter,
      search: searchInput
    })
  }
  const drawer = (
    <Box >
      <Typography variant="h6" fontSize={20}>
        New Arrivals
      </Typography>
      <List>
        {['View All', 'Clothes', 'Underwear'].map((text) => (
          <ListItem className="listItem" button key={text}>
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
          <ListItem className="listItem" button key={text + '0'}>
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
          <ListItem className="listItem" button key={text + '1'}>
            <ListItemText onClick={() => handleChangeCate('women', text.toString().toLowerCase())} primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
  return (
    <>
      <ScrollToTop />
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" > 
            <Navbar/>
            <IconButton  
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{display: { sm: 'none' } }}
              style={{
                height: '30px',
                width:'30px',
                top: '20px',
                zIndex: '20'
              }}
            >
              <MenuIcon 
              />
            </IconButton>
            
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
            }}
            style={{ marginTop: '80px' }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, marginTop: '80px' },
            }}
            open
            style={{ marginTop: '80px' }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Toolbar sx={{ mt: 2.5 }} />
          <Box display='flex' justifyContent='space-between' sx={{ height: '60px', mb: 3 }} >
            <Typography letterSpacing={2} fontSize={40} variant="h6">{filter.cat.toUpperCase()}</Typography>
            <div style={{ position: "relative" }}>
              <TextField onChange={((e: ChangeEvent<HTMLInputElement>) => handleChangeInput(e.target.value))} sx={{ width: 280 }} id="search" label="Search" variant="standard" />
              <Search style={{
                position: "absolute",
                bottom: 18,
                right: 0,
                height: '40px',
                width: '40px',
                padding: '10px',
                cursor: 'pointer',
                backgroundColor: '#DFDFDE',
                borderRadius: '50%'
              }} />
            </div>
          </Box>
          <ProductList filter={filter} />
        </Box>
      </Box>
    </>
  );
}
