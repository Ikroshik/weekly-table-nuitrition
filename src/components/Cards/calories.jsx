import { useState, useEffect } from "react";

export const Calories = ({ serving, metricInCart, onMetricChange }) => {
    const [metric, setMetric] = useState(serving.metric ? (metricInCart || 100) : (metricInCart || 1));

    useEffect(() => {
        const scalingFactor = (metric) / parseInt(serving.metric || 1);
        console.log(scalingFactor)
        
        // Рассчитываем все значения сразу
        const calories = Math.round(parseInt(serving.calories) * scalingFactor);
        const carbs = Math.round(parseInt(serving.carbs) * scalingFactor);
        const protein = Math.round(parseInt(serving.protein) * scalingFactor);
        const fat = Math.round(parseInt(serving.fat) * scalingFactor);

        // Передаем актуальные значения в callback
        onMetricChange({
            metric,
            calories,
            carbs,
            protein,
            fat
        });
    }, [metric, serving]);

    return (
        <div>
            <h3 className="modal-description">Description: {serving.description} - {serving.metric ? `${Math.round(serving.metric)}g` : `1 ${serving.measurement}`} </h3>
            <div className="font-bold">
                <input
                    className="text-center w-16 border border-4 rounded-full main-color px-3 hover:border-lime-400 focus:outline-none transition duration-300 ease-in-out"
                    type="number"
                    value={metric}
                    onChange={e => setMetric(parseInt(e.target.value))}
                />
                {serving.metric ? "g" : (metric === 1 ? serving.measurement : serving.measurement +"s")}
            </div>
            <p>Calories: {Math.round(parseInt(serving.calories) * (metric / parseInt(serving.metric || 1)))}</p>
            <p>Carbs: {Math.round(parseInt(serving.carbs) * (metric / parseInt(serving.metric || 1)))}</p>
            <p>Protein: {Math.round(parseInt(serving.protein) * (metric / parseInt(serving.metric || 1)))}</p>
            <p>Fat: {Math.round(parseInt(serving.fat) * (metric / parseInt(serving.metric || 1)))}</p>
        </div>
    );
};