export async function loadCity() {
    const cityImport = import(`../res/bt1/city.json`)
    console.log(cityImport)
    return cityImport;
}