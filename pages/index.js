import { loadLevels } from '../components/bt1_levels'
import LevelMap from '../components/LevelMap'

const Index = () => {
    const levels = loadLevels();
    // levels.length = 3;

    return (<div>{
        levels.map( level => <LevelMap key={level.level_number} level={level}/> )
    }</div>)
}

export default Index;
