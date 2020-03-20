import Square from './Square'
import styles from './LevelMap.module.css'

const LevelMap = ({level, makeLink}) => {
    const lmap = level.map;
    const levnum = level.level_number;
    console.warn({levnum: levnum})
    makeLink = makeLink || ((num, child) => child)
    const linkNext = child => makeLink(levnum+1, child)
    const linkPrev = child => makeLink(levnum-1, child)
    const linkUp = level.goes_down ? linkPrev : linkNext
    const linkDown = level.goes_down ? linkNext : linkPrev

    const {width, height} = level
    const map = []
    for (let j = height-1; j >= 0; j--) {   
        const row = []
        for (let i = 0; i < width; i++) {
            const element = lmap[i][j];
            map.push(<Square key={[i,j]} element={element} pos={[i, j]} linkUp={linkUp} linkDown={linkDown}/>)
        }
    }

    
    return (<div key={levnum} className={styles.level}>
        <h2>Level {levnum+1}: {level.dungeon_name} {levnum - level.nmax[0] + 1}
        {linkPrev(<button>-</button>)}{linkNext(<button>+</button>)}
        </h2>
        <div className={styles.levelInfo}>
            <h3>Level information</h3>
            <table>
                <tbody>
                    <tr><td>Dungeon name: </td><td>{level.dungeon_name}</td></tr>
                    <tr><td>Wall style: </td><td>{level.wall_style}</td></tr>
                    <tr><td>Phase door: </td><td>{level.phase_door ? "Allowed" : "Not allowed"}</td></tr>
                    <tr><td>Direction: </td><td>{level.goes_down ? "Down" : "Up"}</td></tr>
                    <tr><td>Monster difficulty: </td><td>{level.monster_difficulty}</td></tr>
                    <tr><td>City entry/exit: </td><td>{level.entry_position[0]}E, {level.entry_position[1]}N</td></tr>

                    {/* <tr><td>APAR: </td><td>{level.apar.join(", ")}</td></tr>
                    <tr><td>NMAX: </td><td>{level.nmax.join(", ")}</td></tr> */}
                </tbody>
            </table>
        </div>
        <h3>Level map</h3>
        <div className={styles.levelMap}>
            {map}
        </div>
    </div>)
}

export default LevelMap;
