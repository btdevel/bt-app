import { loadLevels } from '../components/bt1_levels'
import LevelMap from '../components/LevelMap'

import MapGrid from '../components/MapGrid'


const Index = () => {
    const levels = []; //loadLevels();
    // levels.length = 3;

    return (
        <div>
            {levels.map( level => <LevelMap key={level.level_number} level={level}/> )}
            <MapGrid width={10} height={12}/>
        </div>)
}

export default Index;
