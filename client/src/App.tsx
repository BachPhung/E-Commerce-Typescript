import { CartPage } from "./pages/CartPage/CartPage";
import { LandingPage } from "./pages/LandingOnPage/LandingPage";
import { ProductListPage } from "./pages/ProductListPage/ProductList";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { BrowserRouter, Routes as Router, Route } from 'react-router-dom'
import { AddProductPage } from "./pages/AddProductPage/AddProductPage";
function App() {
  return (
    <BrowserRouter>
      <Router>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/products" element={<ProductListPage/>}/>
        <Route path="/products/:id" element={<ProductPage/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/add-product" element={<AddProductPage/>}/>
      </Router>
    </BrowserRouter>
  );
}

export default App;
