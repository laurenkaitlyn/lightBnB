# LightBnB
A simple mulit-page Airbnb clone that uses a server-side Javascript to display the information from queries to web pages via SQL queries

<img width="1415" alt="Screenshot 2023-05-20 at 5 16 32 PM" src="https://github.com/laurenkaitlyn/lightBnB/assets/68622003/72da7442-91da-423b-b693-6fa355d1cef6">
Home page when logged in, it's not pretty but it gets the job done and shows the data haha

<img width="1415" alt="Screenshot 2023-05-20 at 5 16 46 PM" src="https://github.com/laurenkaitlyn/lightBnB/assets/68622003/512b5c03-5ab4-4caf-8615-25dedd0bf98b">
You can search for properties by city, price and average rating in 'Search'

<img width="1415" alt="Screenshot 2023-05-20 at 5 17 00 PM" src="https://github.com/laurenkaitlyn/lightBnB/assets/68622003/950a094a-9bee-425e-bb7b-00947dea80da">
You can look at what properties you currently have available to rent and it's average rating in 'My Reservations'

<img width="1415" alt="Screenshot 2023-05-20 at 5 16 53 PM" src="https://github.com/laurenkaitlyn/lightBnB/assets/68622003/593808ea-fe16-4d5b-9000-cf387003895b">
You can add a new property for users to rent iin 'Create Listing'

## Getting Started 
1. Create a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the npm install command.
4. Start the web server using the npm run local command. The app will be served at http://localhost:3000/.
5. Go to http://localhost:3000/ in your browser.


## Project Structure

```
.
├── db
│   ├── json
│   └── database.js
├── public
│   ├── javascript
│   │   ├── components 
│   │   │   ├── header.js
│   │   │   ├── login_form.js
│   │   │   ├── new_property_form.js
│   │   │   ├── property_listing.js
│   │   │   ├── property_listings.js
│   │   │   ├── search_form.js
│   │   │   └── signup_form.js
│   │   ├── libraries
│   │   ├── index.js
│   │   ├── network.js
│   │   └── views_manager.js
│   ├── styles
│   │   ├── main.css
│   │   └── main.css.map
│   └── index.html
├── routes
│   ├── apiRoutes.js
│   └── userRoutes.js
├── styles  
│   ├── _forms.scss
│   ├── _header.scss
│   ├── _property-listings.scss
│   └── main.scss
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

* `db` contains all the database interaction code.
  * `json` is a directory that contains a bunch of dummy data in `.json` files.
  * `database.js` is responsible for all queries to the database. It doesn't currently connect to any database, all it does is return data from `.json` files.
* `public` contains all of the HTML, CSS, and client side JavaScript. 
  * `index.html` is the entry point to the application. It's the only html page because this is a single page application.
  * `javascript` contains all of the client side javascript files.
    * `index.js` starts up the application by rendering the listings.
    * `network.js` manages all ajax requests to the server.
    * `views_manager.js` manages which components appear on screen.
    * `components` contains all of the individual html components. They are all created using jQuery.
* `routes` contains the router files which are responsible for any HTTP requests to `/users/something` or `/api/something`. 
* `styles` contains all of the sass files. 
* `server.js` is the entry point to the application. This connects the routes to the database.