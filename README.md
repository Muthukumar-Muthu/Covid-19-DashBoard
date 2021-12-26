# Covid-19-DashBoard

Why did I choose to build this project?

When I decided to start working on this project I had just finished learning about Promises, async...await, APIs and error handling. So I decided to use the concepts to build project. So decided to work with Api, fetch, Promise, async etc.,

Choosing the APIs

At first, I didn't know what the project’s theme will be, so I started by researching free APIs to get some insights on what could be done. I found is this list of public APIs on GitHub, where APIs ranging from animals and anime to videos and weather, are being displayed.

I found a couple of them that caught my interest, and I decided to use one that provides COVID-19 up-to-date data.

In this project, I knew I wanted to display the information on cards, so I browsed the Internet to see how professional designers had implemented cards in their work. After looking for quite a few designs, I decided to build a card containing the country flag at the top, the COVID-19 infection related information below the flag.

How this works:

1. When the whole resource loaded, a fetch has been initated to API point. It will contain list of countries object in json. Then I extracted only the country names from the list using getCountryList(url) and sets them to countryList array using getCountry(). During these process the input field will be disabled. So that user cannot input flase country name.
2. And then when the countryList array completed, the input field will be enabled and user gives the input. When the form is submit, it
   checks for falsy input using checkCountry(). If invalid no other further action will be taken and will be notified to user using notify() function.
3. If valid name then a fetch has been initiated to the api for the specific country using the url. And then json will be extracted and the country object will be displayed using showCard().
4. When particluar remove button is invoked, event listener added to that object will be invoked. In this case the function remove() is called. And the particular object is remove.
5. And a remove all functional button was added which invokes removeAll() function and removes all cards.
6. When a country details (json) is requested, the requested json will be added to recentCountry[] array. So if a user inputs a name that have already displayed, then it will show some notifcation. These process is done by the checkCountry() function. It will check whether the country name is valid or whether the country has been displayed earlier. It will return boolean datatype. Based on that function return value further action will be taken

As with my previous project, during the building process, I was constantly testing how the app was performing. Doing this pushed me to modify the HTML and CSS code on several occasions.

Publishing

As I always do, I used Git to keep track of the changes in the project and to be able to publish it on GitHub so I could share it with others 🕺.

Due to the experimental nature of the project, I used GitHub pages to deploy and publish the project. I could also have used Netlify or my own hosting service if the APIs I chose were more reliable.

Lessons learned

At the start, this project seemed simple, but it quickly got complicated.

This project still has room for improvement, but I had to make the decision to stop working on it at some point. Overall, I think it’s functioning as expected.

As always, I'm open to any suggestions you may have about this writing or the project itself.

#html #css #javascript #project #webdevelopment #webdev
