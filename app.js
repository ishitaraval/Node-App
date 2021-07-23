var fs = require("fs");
var dataLib = require("./lib/Covid-19");
var axios = require("axios").default;



var app = {};

app.config = {countryName: process.argv[2] || "usa" , intervalTimer : process.argv[3] || 1000};

app.datafile = function (data1, data2, data3 , data4, data5, data6, data7, data8) {
    fs.appendFile(
      __dirname + "/lib/Covid-19/data.txt",
       `ACTIVE CASES: ${data1},
        COUNTRY NAME:${data2}, 
        LAST UPDATE: ${data3},
        NEW CASES:${data4}, 
        NEW DEATHS: ${data5},
        TOTAL CASES: ${data6},
        TOTAL DEATHS: ${data7},
        TOTAL RECOVERED: ${data8}
        ` + "\r\n",
      function (err) {
        if (err) throw err;
        console.log("Covid Data file updated!");
      }
    )
  }
               
app.printData = function(){
    var detailedData = dataLib.detailedData();

    console.log( "Reading data.txt file :", detailedData);

  // const [data , setData] = useState("");
var options = {
  method: 'GET',
  url: `https://covid-19-tracking.p.rapidapi.com/v1/${process.argv[2]}`,
  params:{ CountryName: process.argv[2]},
  headers: {
    'x-rapidapi-key': 'd98c69ccf1mshd527d2d5e50e8b2p1c4c81jsn38370dfdd88b',
    'x-rapidapi-host': 'covid-19-tracking.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
    const activeCases = response.data["Active Cases_text"];
    const lastUpdate = response.data["Last Update"];
    const newCases = response.data["New Cases_text"]
	const newdeaths = response.data["New Deaths_text"]
	const totalCases = response.data["Total Cases_text"]
	const totalDeaths = response.data["Total Deaths_text"]
	const totalRecovered = response.data["Total Recovered_text"]
    app.datafile(activeCases, response.data.Country_text, lastUpdate, newCases,newdeaths,totalCases,totalDeaths,totalRecovered)
}).then(response => {
    app.loop();
}).catch(function (error) {
	console.error(error);
});

}
 


app.loop = function(){
    fs.appendFile(
        __dirname + "/UpdatedLogData.txt",
        new Date() + " => " + app.config.countryName+"\r\n",
        function(err){
            if(err) throw err;
            console.log("Updation Date Logged");
        }
    )
};


  

setTimeout(app.printData , app.config.countryName, app.config.intervalTimer);



