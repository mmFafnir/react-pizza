import React from "react";
import main from "../scss/main.scss";
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import Pizza from "../components/Pizza";
import FilterBtn from "../components/UI/FilterBtn/FilterBtn";
import Select from "../components/UI/Select/Select";

function Main ({pizza, addPizzaCart, pizzaCart, isLoading}) {
    const [sortTab, setSortTab] = React.useState('все');
    const [valueFilter, setValueFilter] = React.useState('rating');

    const filter = (a, b) => {
        if(valueFilter == "price"){
            return a.price - b.price
        } 
        if(valueFilter == "rating"){
            return b.rating - a.rating
        }
        if(valueFilter == "alphabet"){
            if (a.title < b.title) {return -1;}
            if (a.title > b.title) {return 1;}
            return 0;
        }
    }

 


    const renderPizza = () => {
        const sortedPizzaType = (sortTab.toLowerCase() == 'все') ? pizza : pizza.filter(item => item.type.toLowerCase().includes(sortTab.toLowerCase()));
        const sortedPizzaFromTo = sortedPizzaType.sort((a, b) => filter(a,b));
        return (isLoading ? [...Array(8)] : sortedPizzaFromTo).map((item, index) => (
            <CSSTransition
                key={index} 
                classNames="pizza"
                timeout={500}
            >
                <Pizza 
                    addPizzaCart={addPizzaCart}
                    pizzaCart={pizzaCart}
                    loading={isLoading}
                    {...item}
                />
            </CSSTransition>
        ))
    }
    return (
        <main className="main">
            <div className="filter">
                <div className="filter__btns">
                    <FilterBtn active={true} setSortTab={setSortTab} name={'ingredients'} option={'all'}>Все</FilterBtn>
                    <FilterBtn active={false} setSortTab={setSortTab} name={'ingredients'} option={'meat'}>Мясные</FilterBtn>
                    <FilterBtn active={false} setSortTab={setSortTab} name={'ingredients'} option={'vegetarian'}>Вегетарианская</FilterBtn>
                    <FilterBtn active={false} setSortTab={setSortTab} name={'ingredients'} option={'grill'}>Гриль</FilterBtn>
                    <FilterBtn active={false} setSortTab={setSortTab} name={'ingredients'} option={'sharp'}>Острые</FilterBtn>
                    <FilterBtn active={false} setSortTab={setSortTab} name={'ingredients'} option={'closed'}>Закрытые</FilterBtn>
                </div>
                <div className="filter-select">
                <Select
                    sortFn={setValueFilter}
                    name={'sort'} 
                    values={[{eng: "rating", ru: "популярности"}, {eng: "price", ru: "по цене"}, {eng: "alphabet", ru: "по алфавиту"}]} 
                />
                </div>
            </div>            
            <h2>Все пиццы</h2>
            <TransitionGroup className="menu">
                {
                    renderPizza()
                }
            </TransitionGroup>
        </main>
    )
}

export default Main