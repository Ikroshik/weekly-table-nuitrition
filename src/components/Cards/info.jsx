import { useCallback, useState, memo } from "react";
import { Calories } from "./calories";
import { useDispatch } from 'react-redux';
import { addItem } from '../../state/cart/cartSlice';
import { toast, Bounce } from 'react-toastify';

// import { setOpen } from "../../state/foods/foodsSlice";
export const Info = ({ food, metricInCart, onClose }) => {
    const notify = () => toast.success(`Added ${food.name} ${selectedMetric.metric}g`, {
        position: "bottom-right",
        autoClose: 2000,
        closeOnClick: false,
        pauseOnHover: true,
        theme: "light",
        transition: Bounce,
    });
    const dispatch = useDispatch();
    const [selectedMetric, setSelectedMetric] = useState({
        metric: 0,
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
    });

    const handleMetricChange = useCallback((calories) => {
        setSelectedMetric(calories);
        // console.log('Metric received from child:', selectedMetric);
    }, []);

    const handleAddItem = (item) => {
        dispatch(addItem(item));
    };

    if (!food) return null;

    return (
        <div className="modal z-10">
            <div className="modal-content mt-10 max-w-md">
                <div className="modal-close" onClick={onClose}>X</div>
                <h2 className="text-xl mb-5">{food.name}</h2>
                <p>Type: {food.type}</p>
                <div>
                    {food.images.length > 0 && (
                        <img src={food.images[0]} alt={food.name} width="100" />
                    )}
                </div>
                <div className="modal-text">
                    
                    {food.servings.length === 1 ? (
                        food.servings.map((serving, index) => 
                            <Calories key={index} metricInCart={metricInCart} serving={serving} onMetricChange={handleMetricChange} />
                        )
                    ) : (
                        food.servings.filter(serving => serving.description === '100 g').map((serving, index) => (
                            <Calories key={index} metricInCart={metricInCart} serving={serving} onMetricChange={handleMetricChange} />
                        ))
                    )}
                </div>
                <button className='more-button mt-3' onClick={() => {
                    handleAddItem({food, selectedMetric});
                    notify()
                }}>
                    ADD
                </button>
                
            </div>
        </div>
    );
}