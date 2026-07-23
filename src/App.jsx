import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import Navbar from "./components/common/Navbar"
import Footer from "./components/common/Footer"
import CartDrawer from "./components/cart/CartDrawer"
import Home from "./pages/Home"

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-light text-surface-dark font-sans flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
          <Footer />
          <CartDrawer />
        </div>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
