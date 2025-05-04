import axios from 'axios';
import React, { useState, useEffect, useMemo, createContext } from 'react';

// Create a context for the data
const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [foodName, setFoodName] = useState('corn');
    const [totalPages, setTotalPages] = useState(0);
    const [isFetching, setIsFetching] = useState(false);

    // тут будут хранятся изначальные данные после получения данных из fetchData
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // const fetchData = async () => {
    //     try {
    //         setIsFetching(true);
    //         const response = await axios.get(`http://localhost:3001/api/foods`, {
    //             params: { foodName, currentPage },
    //         });
    //         setIsFetching(false);
    //         const foods = response.data.foods_search.results.food.map((food) => ({
    //             id: food.food_id,
    //             name: food.food_name,
    //             type: food.food_type,
    //             url: food.food_url,
    //             images: food.food_images?.food_image?.map((image) => image.image_url) || [],
    //             servings: food.servings?.serving?.map((serving) => ({
    //                 description: serving.serving_description,
    //                 unit: serving.metric_serving_unit,
    //                 metric: serving.metric_serving_amount,
    //                 calories: serving.calories,
    //                 carbs: serving.carbohydrate,
    //                 protein: serving.protein,
    //                 fat: serving.fat,
    //             })) || [],
    //         }));

    //         setTotalPages(Math.floor(response.data.foods_search.total_results / 10));
    //         setData(foods);
    //         setSelectedCategory(foods);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };

    // useEffect(() => {
    //     fetchData();
    // }, [currentPage]);

    const dataValue = useMemo(
        () => ({
            currentPage,
            setCurrentPage,
            setFoodName,
            data,
            setData,
            isFetching,
            totalPages,
            selectedCategory,
            foodName
            
        }),
        [currentPage, data, setData, setFoodName, setCurrentPage, isFetching, totalPages, selectedCategory, foodName]
    );

    return (
        <DataContext.Provider value={dataValue}>
            {children}
        </DataContext.Provider>
    );
};

export { DataProvider, DataContext };