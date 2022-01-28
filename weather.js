class Weather {
    constructor(current, high, low, condition, humidity, wind) {
        this.current = current;
        this.high = high;
        this.low = low;
        this.condition = condition;
        this.humidity = humidity;
        this.wind = wind;
    }
}

/**
 * Gets the current weather
 * @param {any} celsius if true then weather values are in celsius
 */
async function getCurrentWeather(celsius) {
    var html = await getHtml("https://weather.com/weather/today");

    var current = parseHtml(html, "<span data-testid=\"TemperatureValue\" class=\"CurrentConditions--tempValue--3a50n\">");
    var high = parseHtml(html, "class=\"WeatherDetailsListItem--wxData--2s6HT\"><span data-testid=\"TemperatureValue\">");
    var low = parseHtml(html, "</span>/<span data-testid=\"TemperatureValue\">");
    var humidity = parseHtml(html, "<span data-testid=\"PercentageValue\">");
    var wind = parseHtml(html, "82l6.446 16.44 6.446-16.44z\"></path></svg>");
    var condition = parseHtml(html, "<div data-testid=\"wxPhrase\" class=\"CurrentConditions--phraseValue--2Z18W\">");

    return new Weather(
        celsius ? fahrenheitToCelsius(current) : current, 
        celsius ? fahrenheitToCelsius(high) : high, 
        celsius ? fahrenheitToCelsius(low) : low, 
        condition, 
        humidity, 
        wind);
}

/**
 * Reads the response the website sends from the given url
 */
async function getHtml(url) {
    const response = await fetch(url);
    const text = await response.text();
    return text;
}

/**
 * Utility function for scraping from html
 */
function parseHtml(html, parse) {
    return html.substring(html.indexOf(parse) + parse.length).split("<")[0];
}

/**
 * Turns fahrenheit to celsius
 */
function fahrenheitToCelsius(fahrenheit) {
    var celsius = Math.round((parseInt(fahrenheit) - 32) * 5 / 9);
    if (isNaN(celsius)) {
        return "--";
    }

    return celsius + "°";
}