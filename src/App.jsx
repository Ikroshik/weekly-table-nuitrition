import { useCallback, useRef, useEffect } from 'react';
import axios from 'axios';
import { Pagination } from './components/Pagination/pagination';
import { Category } from './components/Category/category';
import { Profile } from './components/profile';
import { Diet } from './components/diet';
import { Loader } from './components/loader';
import { Skeleton } from './components/Cards/skeleton'
import nonImage from './components/images/noImage.png'
import { DataContext } from './DataProvider';
import { SearchBlock } from './components/Search/searchBlock';
import { Cards } from './components/Cards/cards';
import { CartToggle } from './components/Cart/cartToggle';
import { useGetFoodsQuery } from './state/foods/foodsApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPageRTK } from './state/foods/foodsSlice';

function App() {
  // const { isFetching, data } = useContext(DataContext);
  // const [currentPage, setCurrentPage] = useState(1);
  const renderCount = useRef(0); // Initialize a ref to track render count

  // const currentPage = useSelector((state => state.pageAndFood.currentPage))
  // const currentFood = useSelector((state => state.pageAndFood.currentFood))
  // const { data: foods, isLoading, isSuccess, isFetching } = useGetFoodsQuery({foodName: currentFood, currentPage: currentPage});
  
  useEffect(() => {
    renderCount.current += 1;
    console.log(`App component has rendered ${renderCount.current} times`);
  });
  // if (isSuccess) {
  //   console.log({foods})
    
  // }
  
  // const [isOpen, setIsOpen] = useState(false);
  // const [selectedFood, setSelectedFood] = useState(null);

  // хук для отслеживания отключенной кнопки
  // const [disabledButton, setDisabledButton] = useState(null);

  // const openWindow = (food) => {
  //   setSelectedFood(food);
  //   setIsOpen(true);
  //   document.body.style.overflow = 'hidden';
  // }

  // const closeWindow = () => {
  //   setSelectedFood(null);
  //   setIsOpen(false);
  //   document.body.style.overflow = 'auto';
  // }

  //все тоже самое, что и сверху, только с новыми параметрами
  // const fetchSuggestions = async (expression) => { // асинк функция, параметр это что пользователь вводит
  //   try {
  //     const response = await axios.get('http://localhost:3001/api/autocomplete', {
  //       params: {
  //         expression,
  //       },
  //     });
  //     //тут все понятно, гет запрос, к прокси серверу, и параметр квери этот

  //     //тут обработка ответа от сервера, чтобы извелечь массив предложений
  //     const suggestionsData = response.data.suggestions; // извлекает из ответа объект, в котором свойство suggestion
  //     const fetchedSuggestions = suggestionsData && Array.isArray(suggestionsData.suggestion) // suggestionsData должно быть истиным значением, а также массивом
  //       ? suggestionsData.suggestion // если оба условия истина, то присваивается значение suggestionsData.suggestion
  //       : []; // если хотя бы один ложный, то пустой массив 
  //     // проверяет, является ли suggestionData.suggestion массивом. 
  //     //Если да, то он сохраняется в переменной fetchedSuggestions. 
  //     //Если нет, то fetchedSuggestions становится пустым массивом. 
  //     setSuggestions(fetchedSuggestions.length > 0 ? fetchedSuggestions : []);
  //   } catch (error) {
  //     console.error('Error fetching suggestions:', error);
  //     setSuggestions([]);
  //   }
  // };
  // извлекает значение из поля ввода event.target а value это текст пользователя
  // const handleInputChange = (event) => {
  //   const value = event.target.value;
  //   setFoodName(value);
  //   // тут если длинна текста больше 2, то вызывается функция fetchSuggestion
  //   if (value.length > 2) {
  //     fetchSuggestions(value);
  //   } else {
  //     setSuggestions([]);
  //   }
  // };

  //это если пользователь кликает на что-то из автозаполения, то заменяет текст на то, что он выбрал
  

  //это пока не работает, но тут крч 
  //функция, что если выбрано в food_type = all, ты возвращает всю дату
  //если же нет, то применяется хук и выбирается по кнопке
  // UPD: Сделал фильтрацию, которую ты хотел сделать
  // const filterFood = (category) => {

  //   // Если ничего ещё не искали, то кнопки работать не будут
  //   if (!selectedCategory) {
  //     return
  //   }

  //   // Делаем нажатую кнопку disabled
  //   setDisabledButton(category);

  //   /* Тут происходит проверка на что мы нажали, все кроме All, будет применяться filter,
  //   а если All просто рендерим изначальные данные, которые получили */
  //   if (!category) {
  //     setData(selectedCategory);
  //   } else {
  //     const categoryData = selectedCategory.filter(food => food.type === category);
  //     setData(categoryData);
  //   }

  // }



  return (
    <>
      <div className='min-h-screen flex flex-col justify-center items-center'>
        <main className='grow px-8'>
          
          
          
          <SearchBlock />

          {/* <Category /> */}

          <CartToggle />

          <Cards/>

        </main>
          <Pagination/>
      </div>
      {/* {isOpen && <Info food={selectedFood} onClose={closeWindow} />} */}

      {/* Закометил твою пагинацию */}
      {/* <div className='pagination'>
        {show && <Pagination page_numbers={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} fetchData={fetchData} />}
      </div>
      <div className='menuPhone'>
        <div className='selectedOne'>
          1
        </div>
        <div className='unselectedOne'>
          2
        </div>
        <div className='unselectedOne'>
          3
        </div>
      </div> */}
    </>
  );
}

export default App;