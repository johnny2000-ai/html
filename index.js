// Installing package 
const express = require('express') 
const path = require('path') 
const app = express() 

const PORT = process.env.PORT || 4433

// Middleware function 
const parseData = (req, res, next) => { 
	if (req.method === 'POST') { 
		const formData = {} 
		req.on('data', data => { 

			// Decode and parse data 
			const parsedData = 
				decodeURIComponent(data).split('&') 

			for (let data of parsedData) { 

				decodedData = decodeURIComponent( 
						data.replace(/\+/g, '%20')) 

				const [key, value] 
					= decodedData.split('=') 

				// Accumulate submitted data 
				// in an object 
				formData[key] = value 
			} 

			// Attach form data in request object 
			req.body = formData 
			next() 
		}) 
	} else { 
		next() 
	} 
} 

// View engine setup 
app.set("views", path.join(__dirname)) 
app.set("view engine", "ejs") 

// Render Login form page 
app.get('/', (req, res) => { 
	res.render('registrationForm') 
}) 

// Creating Post Route for login 
app.post('/information', parseData, (req, res) => { 

	// Retrive form data from request object 
	const data = req.body 
	const { username, 
		email, 
		password, 
		confirmPassword, 
		sex,
		message,
	} = data 

	// Printing fetched data in 
	// developer's console 
	console.log(data) 
}) 

// Setting up listener 
app.listen(PORT, () => { 
	console.log(`Server start on port ${PORT}`) 
}) 
