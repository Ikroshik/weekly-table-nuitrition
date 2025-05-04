import React, { useContext } from "react"
import { DataContext } from "../../DataProvider";

export const Suggestions = ({ suggestions, setSuggestions }) => {
    const {setFoodName} = useContext(DataContext)

    const handleSuggestionClick = (suggestion) => {
        setFoodName(suggestion);
        setSuggestions([]);
      };

    return (
        <>
            {suggestions.length > 0 && (
                <ul className='suggestions-list'>
                    {suggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}

        </>

    )
} 