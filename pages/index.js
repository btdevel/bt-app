import { loadLevels } from '../components/bt1_levels'
import LevelMap from '../components/LevelMap'

const Index = () => {
    const levels = loadLevels();
    return (<div>{
        levels.map( level => <LevelMap level={level}/> )
    }</div>)
    
}

export default Index;
