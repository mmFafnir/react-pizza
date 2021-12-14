import React, { useState } from "react";
import { Link } from 'react-router-dom';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import "../scss/basket.scss";
import MyButton from "../components/UI/Button/MyButton";
import CartPizza  from "../components/CartPzza";

function Basket ({pizzaCart, deletePizzaCart, clearBasket}) {
    const [allPizza, setAllPizza] = useState()
    const [totalPrice, setTotalPrice] = useState()
    const changeAllPrice = () => {  
        let x,y;
        const numbers = pizzaCart.map((item) => item.quantity);
        const prices = pizzaCart.map((item) => item.price * item.quantity);
        const quantity = numbers.map(i=>x+=i, x=0).reverse()[0];
        const total = prices.map(i=>y+=i, y=0).reverse()[0];
        setAllPizza(quantity);
        setTotalPrice(total);
    }
    React.useEffect(()=> {
        changeAllPrice();
    }, [pizzaCart])


    const renderCartPizza = () => {
        return pizzaCart.map((item) => (
            <CSSTransition
                key={item.currentId}
                timeout={500}
                classNames="pizza-cart"
            >
                <CartPizza  item={item} changeAllPrice={changeAllPrice} deletePizzaCart={deletePizzaCart}/>
            </CSSTransition>
        ))
    }
    
    return (
        <main className="basket">
            {(pizzaCart.length > 0) ? (
                <>
                <div className="basket__header basket-header">
                    <div className="basket-logo">
                        <div className="basket-logo__img">
                            <img  src="img/cartlogo.svg"/>
                        </div>
                        <h2>Корзина</h2>
                    </div>
                    <button onClick={clearBasket} className="basket-clear">
                        <i className="fas fa-trash"></i>
                        <span>Очистить корзину</span>
                    </button>
                </div>
                <div className="basket__body">
                    {

                        <TransitionGroup>
                            {renderCartPizza()}
                        </TransitionGroup>
                    }
                </div>
                <div className="basket__footer">
                    <div>
                        <p>
                            <span>Всего пицц:</span>
                            <span className="quantity">{allPizza} шт.</span>
                        </p>
                        <p>
                            <span>Сумма заказа:</span>
                            <span className="price">{totalPrice} ₽</span>
                        </p>
                    </div>

                    <div>
                        <MyButton><Link to="/" className="btn">Вернуться назад</Link></MyButton>
                        <MyButton><span className="btn btn2">Оплатить сейчас</span></MyButton>
                    </div>
                </div>
                </>
            ) : 
            (
                <div className="basket-empty opacity">
                    <h2>
                        Корзина пустая {'('}
                    </h2>
                    <p>
                    Вероятней всего, вы не заказывали ещё пиццу.
                    Для того, чтобы заказать пиццу, перейди на главную страницу.
                    </p>
                    <div className="basket-empty__img">
                        <img src="img/layer.svg"/>  
                    </div>
                    <Link to="/"><button className="basket-empty__btn">Вернуться назад</button></Link>
                </div>
            )}
        </main>
       
    )
}

export default Basket