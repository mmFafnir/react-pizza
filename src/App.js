
import React, { useEffect } from "react";
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes ,
  Route,
  Link,
} from 'react-router-dom'
import nullStyle from  "./scss/null.scss";
import appStyle from './scss/app.scss';
import Header from "./components/Header";
import Main from "./pages/Main";
import Basket from "./pages/Basket"
import MyButton from "./components/UI/Button/MyButton";
import react from "react";




function App() {
const [pizza, setPizza] = React.useState([]);
const [pizzaCart, setPizzaCart] = React.useState([]);
const [allQuantity, setAllQuantity] = React.useState(pizzaCart.length);
const [totalPrice, setTotalPrice] = React.useState(pizzaCart.length);
const [isLoading, setIsLoading] = React.useState(true)
React.useEffect(()=> {
  async function fenchData () {
    const pizzaRes = await axios.get('https://619d484e131c600017088e7d.mockapi.io/pizza');
    setPizza(pizzaRes.data);
    setIsLoading(false)
  }
  fenchData()
}, [])

const changePriceHeader = () => {
  let y;
  const prices = pizzaCart.map((item) => item.price);
  const total = prices.map(i=>y+=i, y=0).reverse()[0];
  return total;
}

React.useEffect(() => {
  setTotalPrice(changePriceHeader()); 
  setAllQuantity(pizzaCart.length)

}, [allQuantity, pizzaCart])

const addPizzaCart = (obj) => {
  if(pizzaCart.find(item => item.currentId === obj.currentId)){

  } else {
    setPizzaCart((prev) => [...prev, obj]);
    setAllQuantity(pizzaCart.length+1)
  }
}



const deletePizzaCart = async (id) => {
  console.log(id);
  setPizzaCart((prev) => prev.filter((item) => item.currentId !== id));
}

const clearBasket = () => {
  setPizzaCart([])
}




  return (
    <div className="App">
    <Router basename={process.env.PUBLIC_URL}>
      <Header allQuantity={allQuantity} totalPrice={totalPrice}/>  
      <Routes>
        <Route path='/' element={<Main pizza={pizza} pizzaCart={pizzaCart} addPizzaCart={addPizzaCart} isLoading={isLoading} />} />

        <Route path='/basket' 
        element={
         <Basket pizzaCart={pizzaCart} deletePizzaCart={deletePizzaCart} clearBasket={clearBasket}/>
        } 

        />
      </Routes>
    </Router>

    </div>
  );

}

export default App;
