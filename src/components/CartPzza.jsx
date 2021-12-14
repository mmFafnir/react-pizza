import React, { useEffect } from "react";
import MyButton from "./UI/Button/MyButton";
import pizza from "../scss/basket.scss";


function CartPizza ({item, changeAllPrice, deletePizzaCart}) {
    const [quantity, setQuantity] = React.useState(1);
    const deletePizza = () => {
        deletePizzaCart(item.currentId)
       
    }
    const changeQuantity = (action) => {
        if(action == 'plus'){
            setQuantity(quantity + 1)
        } else if(action == 'minus' && quantity != 1) {
            setQuantity(quantity - 1)
        }
    }

    useEffect(() => {
        item.quantity = quantity;
        setQuantity(item.quantity);
        changeAllPrice();
    }, [quantity])
    return (
        <div className="pizza-cart opacity ">
            <div className="pizza-cart__left">
                <div className="pizza-cart__img">
                    <img src={'https://mmfafnir.github.io/react-pizza/img/' + item.img + '.png'}/>
                </div>
                <div className="pizza-cart__desc">
                    <h3>{item.title}</h3>
                    <p>
                        <span>{item.type} тесто,</span>
                        <span>{item.size}см</span>
                    </p>
                </div>
            </div>
            <div className="pizza-cart__quantity">
                <MyButton click={() => changeQuantity('plus')}><span className="plus">+</span></MyButton>
                <p>{item.quantity}</p>
                <MyButton click={() => changeQuantity('minus')}><span className="minus">-</span></MyButton>
            </div>
            <p className="pizza-cart__price">{item.price * item.quantity} ₽ </p>
            <button onClick={deletePizza} className="pizza-cart__delete">+</button>
        </div>
    )
}
export default CartPizza