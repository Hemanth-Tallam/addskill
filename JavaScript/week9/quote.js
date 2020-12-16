const fetch = require("node-fetch");
async function quotes(){
    let url="https://quotes.rest/qod ";
    let response= await fetch(url,
        {
            method:'GET',
            headers:{
                'Accept': 'application/json'
            }})
        let result=response.json()
        result.then(
            function(res){
                if (res.error){
                    console.log(res.error.message)
                }
                else{
                    console.log(res.contents.quotes[0].quote)
                }
            }
        )
    }
quotes()
