import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const foodsApiSlice = createApi({
    reducerPath: "foods",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://wtn-server-5y3u.vercel.app"
    }),
    endpoints: (builder) => {
        return {
            getFoods: builder.query({
                query: (foodAndPage) => ({
                    url: "/api/foods",
                    params: {...foodAndPage}
                 }),
                 transformResponse: (response) => {
                    const foods = response.foods_search.results.food.map((food) => ({
                        id: food.food_id,
                        name: food.food_name,
                        type: food.food_type,
                        url: food.food_url,
                        images: food.food_images?.food_image?.map((image) => image.image_url) || [],
                        servings: food.servings?.serving?.map((serving) => ({
                            description: serving.serving_description,
                            unit: serving.metric_serving_unit,
                            measurement: serving.measurement_description,
                            metric: serving.metric_serving_amount,
                            calories: serving.calories,
                            carbs: serving.carbohydrate,
                            protein: serving.protein,
                            fat: serving.fat,
                        })) || [],
                    }));

                    return {
                        foods,
                        totalPages: Math.floor(response.foods_search.total_results / 10)
                    }
                 }
            })
        };
        
    }
});

export const { useGetFoodsQuery } = foodsApiSlice