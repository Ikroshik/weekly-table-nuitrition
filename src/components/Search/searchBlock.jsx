import React, { memo, useContext, useState } from "react"
import { Suggestions } from "./suggestions";
import { Search } from './search';
import axios from "axios";


export const SearchBlock = () => {

    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async (expression) => { // асинк функция, параметр это что пользователь вводит
        try {
          const response = await axios.get('http://localhost:3001/api/autocomplete', {
            params: {
              expression,
            },
          });
          //тут все понятно, гет запрос, к прокси серверу, и параметр квери этот
    
          //тут обработка ответа от сервера, чтобы извелечь массив предложений
          const suggestionsData = response.data.suggestions; // извлекает из ответа объект, в котором свойство suggestion
          const fetchedSuggestions = suggestionsData && Array.isArray(suggestionsData.suggestion) // suggestionsData должно быть истиным значением, а также массивом
            ? suggestionsData.suggestion // если оба условия истина, то присваивается значение suggestionsData.suggestion
            : []; // если хотя бы один ложный, то пустой массив 
          // проверяет, является ли suggestionData.suggestion массивом. 
          //Если да, то он сохраняется в переменной fetchedSuggestions. 
          //Если нет, то fetchedSuggestions становится пустым массивом. 
          setSuggestions(fetchedSuggestions.length > 0 ? fetchedSuggestions : []);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        }
      };

    return (
        
        <div className='find_product pt-5 ms-5 text-center'>
          <Search fetchSuggestions={fetchSuggestions} setSuggestions={setSuggestions} />
          <Suggestions suggestions={suggestions} setSuggestions={setSuggestions} />
        </div>

    )
}