"use server";

export const getRandomQuote = async () => {
    const data = await fetch("https://api.api-ninjas.com/v1/quotes?category=love", {
        method: "GET",
        headers: {
            "X-Api-Key": process.env.XAPIKEY!
        },
    });
    const quote = await data.json();

    return quote;
};