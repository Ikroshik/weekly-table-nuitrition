import { useContext, useState, useEffect, memo } from "react";
import { DataContext } from '../../DataProvider';

export const Category = () => {
    const { selectedCategory, setData, isFetching } = useContext(DataContext);
    const [disabledButton, setDisabledButton] = useState(null);

    useEffect(() => {
        filterFood(disabledButton)
      }, [isFetching])

    const filterFood = (category) => {

        // Если ничего ещё не искали, то кнопки работать не будут
        if (!selectedCategory) {
          return
        }
    
        // Делаем нажатую кнопку disabled
        setDisabledButton(category);
    
        /* Тут происходит проверка на что мы нажали, все кроме All, будет применяться filter,
        а если All просто рендерим изначальные данные, которые получили */
        if (!category) {
          setData(selectedCategory);
        } else {
          const categoryData = selectedCategory.filter(food => food.type === category);
          setData(categoryData);
        }
    
      }


    return (
        <div className='category_buttons mt-3 flex justify-center gap-5'>
            <button
                onClick={() => filterFood(null)}
                disabled={disabledButton === null}
                className={disabledButton === null ? 'bg-lime-300 rounded p-1 px-2' : 'bg-gray-100 rounded  p-1 px-2'}
            >
                All
            </button>
            <button
                onClick={() => filterFood('Generic')}
                disabled={disabledButton === 'Generic'}
                className={disabledButton === 'Generic' ? 'bg-lime-300 rounded  p-1 px-2' : 'bg-gray-100 rounded  p-1 px-2'}
            >
                Generic
            </button>
            <button
                onClick={() => filterFood('Brand')}
                disabled={disabledButton === 'Brand'}
                className={disabledButton === 'Brand' ? 'bg-lime-300 rounded  p-1 px-2' : 'bg-gray-100 rounded  p-1 px-2'}
            >
                Brand
            </button>
        </div>
    )
}