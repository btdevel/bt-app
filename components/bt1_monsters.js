import data from 'res/bt1/monsters.json'
import Tooltip from '@material-ui/core/Tooltip'

export default function loadMonsters() {
    const numMonsters = data.monsters.length
    const monsters = []

    for( let i=0; i<numMonsters; i++) {
        const monster = Object.assign({}, data.monsters[i], data.info[i])
        const hp = monster.hp.split("-").map(s => parseInt(s))
        monster.hpMin = hp[0]
        monster.hpMax = hp[1]
        monster.ac = parseInt(monster.ac)
        monster.xp = parseInt(monster.xp)
        monster.group = parseInt(monster.group)
        monsters.push(monster)
    }
    return monsters;
}

const renderMonsterImage = (num, tooltip) => {
    const url = `/image/bt1/gifs/amiga/bt1-${num}.gif`
    if(tooltip)
        return <Tooltip title={<img style={{transform: "scale(2)"}} src={url}/>}><img style={{height: "3em"}} src={url}/></Tooltip>
    else
        return <img style={{height: "3em"}} src={url}/>
}

export {renderMonsterImage}