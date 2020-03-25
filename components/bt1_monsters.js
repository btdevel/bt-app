import data from 'res/bt1/monsters.json'


export default function loadMonsters() {
    const numMonsters = data.monsters.length
    const monsters = []

    for( let i=0; i<numMonsters; i++) {
        const monster = Object.assign({}, data.monsters[i], data.info[i])
        const hp = monster.hp.split("-").map(s => parseInt(s))
        monster.hpMin = hp[0]
        monster.hpMax = hp[1]
        monsters.push(monster)
    }
    return monsters;
}
