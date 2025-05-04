import React, { useState, useCallback, useEffect } from 'react';
import { Card } from './card';
import { Info } from './info';
import { useGetFoodsQuery } from '../../state/foods/foodsApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setTotalPages } from '../../state/foods/foodsSlice';
import { Skeleton } from './skeleton';

export const Cards = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.pageAndFood.currentPage);
    const currentFood = useSelector((state) => state.pageAndFood.currentFood);
    const { data: foods, isSuccess, isFetching } = useGetFoodsQuery({ foodName: currentFood, currentPage: currentPage });

    useEffect(() => {
        if (isSuccess && foods) {
            dispatch(setTotalPages(foods.totalPages));
        }
    }, [foods, isSuccess, dispatch]);

    return (
        <>
            <div className='cards'>
                {isFetching ? (
                    Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} />)
                ) : (
                    foods?.foods.map((food) => (
                        <Card key={food.id} food={food} />
                    ))
                )}
            </div>
        </>
    );
};