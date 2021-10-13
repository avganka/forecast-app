export default async function request(url) {
    let res = await fetch(url);
    let json = await res.json();
    return await json;
    //  await resJson.list.forEach(city => {
    //      createSmallCards(city);
    //  });
}