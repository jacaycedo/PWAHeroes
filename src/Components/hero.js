import React, { useState, useEffect } from 'react'
var md5 = require('md5')

function Hero() {
    const privateKey = 'dc001e65f215aa1bd67f00d93b2186dac2053ecd';
    const publicKey = '97d8cfcac4b2937d1f8aa43ec320c8c8';
    const ts = 1;
    const [hero, updateHero] = useState([]);
    const urlApi = 'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=' + publicKey + '&hash=' + md5(ts + privateKey + publicKey)
    useEffect(() => {
        if (!navigator.onLine) {
            console.log("OFFLINE, loading cache")
            if (localStorage.getItem("hero") === null) updateHero(['loading'])
            else {updateHero(JSON.parse(localStorage.getItem("hero")));}
        }
        fetch(urlApi)
            .then((res) => res.json())
            .then((res) => {
                localStorage.setItem("hero", JSON.stringify(res.data.results));
                updateHero(res.data.results);
            });
    }, [])

    return (
        <>
            <h1>Personajes de Marvel</h1>
            { hero? hero.map((i, e) => {
                return (<div className='hero'>
                    <p>{i.name}</p>
                    <img src={i.thumbnail.path + '.' + i.thumbnail.extension} style={{ height: '250px', width: '250px' }} />
                </div>)
            }) : <p>Loading</p>
            }
        </>

    )
}
export default Hero;