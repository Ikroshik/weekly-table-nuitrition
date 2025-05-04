const express = require('express');
const axios = require('axios');
const OAuth = require('oauth-1.0a');
const CryptoJS = require('crypto-js');
const cors = require('cors');
const sequelize = require('./config/database');
const User = require('./Models/User')
const app = express();
const port = 3001;
app.use(express.json()); // чтобы парсить JSON в реквест бади
// использует АХИОС, ОАУТЗ 1-0а) и какой-то нахуй крипто джс (вообще не ебу что это), ну и корс какой-то
// почитал, это библиотеки, которые используют различные алгоритмы шифрования, чтобы создать подпись HMAC-SHA1
//cors чтобы обрабатывать запросы эти ебанские Cross-Origin Resource Sharing, который ограничивает запрашиваемые с другого домена приколы
app.use(cors());


//проверка законектилось или нет
const checkDatabaseConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('DATABASE CONNECTED');
        await sequelize.sync();
        console.log('Models synchronized');
    } catch (err) {
        console.error('DATABASE NOT WORKING', err);
    }
};
// checkDatabaseConnection();

//это все из видоса
app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Не удалось найти пользователей' });
    }
});

app.post('/users/create', async (req, res) => {
    try {
        const { username, password } = req.body; // деструктуризация
        const newUser = await User.create({ username, password });
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Не удалось создать пользователя' });
    }
});

app.delete('/users/delete', async (req, res) => {
    try {
        const userId = req.body.id;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const result = await User.destroy({
            where: {
                id: userId
            }
        });
        if (result === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted succesfully' });
    } catch (error) {
        console.error('Error deleting user', error);
        res.status(500).json({ error: 'Occured error' })
    }
})


// это аунтефикация для oauth1.0a
const oauth = new OAuth({
    consumer: {
        key: '************************',
        secret: '***********************',
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
        return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
    },
});

// эта тема обработка гет запросов, ну тут все понятно
app.get('/api/foods', async (req, res) => {
    const foodName = req.query.foodName || '';
    const currentPage = req.query.currentPage;
    console.log(req.query)


    const request_data = {
        url: 'https://platform.fatsecret.com/rest/server.api',
        method: 'GET',
        data: {
            method: 'foods.search.v3',
            search_expression: foodName,
            format: 'json',
            include_food_images: 'true',
            max_results: 10,
            page_number: currentPage,
            flag_default_serving: false
        },
    };


    // Генерирует OAuth параметры
    const oauthParams = oauth.authorize(request_data);

    // Include OAuth parameters in the request data
    const requestDataWithOAuth = {
        ...request_data.data,
        ...oauthParams,
    };

    // тут axios для отправки запроса и параметры
    try {
        const response = await axios({
            url: request_data.url,
            method: request_data.method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': '*/*',
            },
            params: requestDataWithOAuth, // Use params for GET requests
        });

        // console.table(requestDataWithOAuth);
        console.log(response.data.foods_search.results.food[2].servings)
        
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).send('Error fetching data');
    }
});

// это для автозаполнение, тоже самое что и верхний, только с новыми параметрами и для автозаполения
app.get('/api/autocomplete', async (req, res) => {
    const expression = req.query.expression || '';

    const request_data = {
        url: 'https://platform.fatsecret.com/rest/food/autocomplete/v2',
        method: 'GET',
        data: {
            expression,
            format: 'json',
            max_results: 10,
        },
    };

    const oauthParams = oauth.authorize(request_data);

    const requestDataWithOAuth = {
        ...request_data.data,
        ...oauthParams,
    };

    try {
        const response = await axios({
            url: request_data.url,
            method: request_data.method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': '*/*',
            },
            params: requestDataWithOAuth,
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error.response ? error.response.data : error.message);
        res.status(500).send('Error fetching autocomplete suggestions');
    }
});

// бахает текст на странице что сервер запущен
app.get('/', (req, res) => {
    res.send('Welcome to the API proxy server!');
});

// тут бахает что в консоль, что сервер работает на порте 3001
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});