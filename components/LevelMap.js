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

    return (<div>
        <h2>Level {levnum+1}: {level.dungeon_name}</h2>
        <div className={styles.level}>
            {map}
        </div>
    </div>)
}

export default LevelMap;
