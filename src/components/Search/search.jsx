import React, { memo, useCallback, useContext, useState, useEffect } from "react";
import { DataContext } from "../../DataProvider";
import { useDispatch, useSelector } from "react-redux";
import { useGetFoodsQuery } from "../../state/foods/foodsApiSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { setCurrentFood } from "../../state/foods/foodsSlice";

/**
 * Компонент Search, где:
 * 1) Поле ввода (inputValue) хранится в локальном состоянии,
 * 2) foodName в контексте обновляется только при нажатии на кнопку "Find",
 *    что предотвращает ререндеринг всего приложения на каждый ввод символа,
 * 3) Функция fetchSuggestions вызывается из эффекта при изменении inputValue,
 *    если длина строки больше 2.
 */
export const Search = ({ fetchSuggestions, setSuggestions }) => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  

  // Локальное состояние для значения поля ввода
  

  // Обновляем только локальный стейт при вводе
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Вызываем подсказки на основе текущего локального значения inputValue
  useEffect(() => {
    // console.count()
    const timerId = setTimeout(() => {
      if (inputValue.length > 2) {
        fetchSuggestions(inputValue);
      } else {
        setSuggestions([]);
      }
    }, 200);

    return () => clearTimeout(timerId);
  }, [inputValue]);

  // При нажатии на кнопку "Find" сохраняем значение в контекст и делаем запрос
  const handleSearch = () => {
    
    dispatch(setCurrentFood(inputValue))
    // setFoodName(inputValue);
  };

  // useEffect(() => {
  //   if (foodName) {
  //     fetchData();
  //   }
  // }, [foodName]);

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter food name"
        className="find-input"
      />
      <button className="ms-5" onClick={handleSearch}>
        Find
      </button>
    </>
  );
}