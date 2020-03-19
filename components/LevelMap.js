import Square from './Square'
import styles from './LevelMap.module.css'

const LevelMap = ({level}) => {
    const lmap = level.map;
    const levnum = level.level_number;

    const {width, height} = level
    const map = []
    for (let j = height-1; j >= 0; j--) {
        const row = []
        for (let i = 0; i < width; i++) {
            const element = lmap[i][j];
            map.push(<Square key={[i,j]} element={element} pos={[i, j]}/>)
        }
        //map.push(<div key={j}>{row}</div>)
    }

    return (<div key={levnum} className={styles.level}>
        <h2>Level {levnum+1}: {level.dungeon_name}</h2>
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
