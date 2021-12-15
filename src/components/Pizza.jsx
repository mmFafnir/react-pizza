import React, { useRef, useState } from "react";
import MyButton from "./UI/Button/MyButton";
import pizza from "../scss/pizza.scss";
import ContentLoader from "react-content-loader";

function Pizza ({title, price, pizzaId, img, tuning, addPizzaCart, pizzaCart, loading=false, ...props}) {
    const currentPizzaCart = pizzaCart.filter(item => item.id == pizzaId); 
    const [quantity, setQuantity] = useState((currentPizzaCart.length > 0 ? currentPizzaCart.length : ''));
    const formRef = useRef();
    
    const collectObjPizza = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const obj = {};
        let changeId = "пицца" + pizzaId;
        obj.id = pizzaId;
        obj.title = title;
        obj.price = price;
        obj.img = img;
        obj.quantity = (currentPizzaCart[0]) ? currentPizzaCart[0].quantity : 0;
        
        for (let entry of formData.entries()) {
            const name = entry[0].replace(/[^a-z]/, '');
            const value = entry[1];
            changeId = changeId + value
            obj[name] = value;
            obj.currentId = changeId;
        }

        if(pizzaCart.filter(item => item.currentId == obj.currentId) == false){
            const number = currentPizzaCart.length;
            setQuantity(number + 1)
        } 
        
        addPizzaCart(obj);
    }

 



    return (
        <>
        {(loading) ? (
            <ContentLoader 
                speed={2}
                width={280}
                height={459}
                viewBox="0 0 280 459"
                backgroundColor="#c7c7c7"
                foregroundColor="#e7dfdf"
                {...props}>
                <circle cx="131" cy="156" r="122" /> 
                <rect x="9" y="301" rx="4" ry="4" width="260" height="33" /> 
                <rect x="9" y="350" rx="0" ry="0" width="128" height="21" /> 
                <rect x="9" y="382" rx="0" ry="0" width="77" height="21" /> 
                <rect x="142" y="350" rx="0" ry="0" width="128" height="21" /> 
                <rect x="100" y="382" rx="0" ry="0" width="77" height="21" /> 
                <rect x="190" y="382" rx="0" ry="0" width="77" height="21" /> 
                <rect x="168" y="411" rx="8" ry="8" width="100" height="28" />
            </ContentLoader>
        ) : (
        <div className="pizza ">
            <div className="pizza__img">
                <img src={ 'https://mmfafnir.github.io/react-pizza/img/' + img + '.png'} />
            </div>
            <h3>{title}</h3>
            <form className="pizza-option" ref={formRef} onSubmit={collectObjPizza}>
                <div className="pizza-option__form">
                    <div className="pizza-option__side mb-5">
                        {Object.entries(tuning.type).map(([key, val], index) => (
                                <div key={key} className="pizza-option__input">
                                    <input 
                                        type="radio" 
                                        value={key} 
                                        name={pizzaId + 'type'} 
                                        id={pizzaId + 'type' + index}  
                                        disabled={val == 'no' ? true : false}
                                        defaultChecked={((index == 0 && val != 'no') || (index == 1 && val != 'no')) ? true  : false}
                                    />
                                    <label htmlFor={pizzaId + 'type' + index}>{key}</label>
                                </div>
                        ))}
                    </div>
                    <div className="pizza-option__side">
                       {Object.entries(tuning.size).map(([key, val], index) => (
                                <div key={key} className="pizza-option__input">
                                    <input 
                                        type="radio" 
                                        value={key} 
                                        name={pizzaId + 'size'} 
                                        id={pizzaId + 'size' + index}  
                                        disabled={val == 'no' ? true : false}
                                        defaultChecked={((index == 0 && val != 'no') || (index == 1 && val != 'no')) ? true  : false}
                                    />
                                    <label htmlFor={pizzaId + 'size' + index}>{key}</label>
                                </div>
                        ))}
                    </div>
                </div>
                <div className="pizza__footer">
                    <p className="price">от {price}Р</p>
                    <MyButton>
                        <input type="submit" id={"submit" + pizzaId}/>
                            <span>+</span>
                            <span className="mlr-10">Добавить</span>
                            <span className="quantity">{quantity}</span>
                    </MyButton>
                </div>
            </form>

        </div>

        )}

    </>
    )
}
export default Pizza