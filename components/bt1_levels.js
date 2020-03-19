import level00 from '../res/bt1/levels/level_00.json'
import level01 from '../res/bt1/levels/level_01.json'
import level02 from '../res/bt1/levels/level_02.json'
import level03 from '../res/bt1/levels/level_03.json'
import level04 from '../res/bt1/levels/level_04.json'
import level05 from '../res/bt1/levels/level_05.json'
import level06 from '../res/bt1/levels/level_06.json'
import level07 from '../res/bt1/levels/level_07.json'
import level08 from '../res/bt1/levels/level_08.json'
import level09 from '../res/bt1/levels/level_09.json'
import level10 from '../res/bt1/levels/level_10.json'
import level11 from '../res/bt1/levels/level_11.json'
import level12 from '../res/bt1/levels/level_12.json'
import level13 from '../res/bt1/levels/level_13.json'
import level14 from '../res/bt1/levels/level_14.json'
import level15 from '../res/bt1/levels/level_15.json'

const transform_map = (level) => {
    const {width, height} = level;
    const map = Array(height);

    for(let i=0; i<height; i++) {
        map[i] = Array(width);
        for(let j=0; j<width; j++) {
            const space = {}
            const walls = level.wall_data[i+j*width]
            space.north = (walls & 0b00000011) >> 0
            space.south = (walls & 0b00001100) >> 2
            space.east  = (walls & 0b00110000) >> 4
            space.west  = (walls & 0b11000000) >> 6

            const spec = level.spec_data[i+j*width]
            space.darkness = (spec & 0b00001000)!=0;
            map[i][j] = space
        }
    }

    for(let msg_struct of level.messages) {
        const [[j, i], msg] = msg_struct
        console.log(`(${i},${j}) -> ${msg}`)
        map[i][j].message = msg;
    }
    return map;
}

const transform_level = (level, index) => {
    level.height = 22;
    level.width = 22;
    level.level_number = index;
    const map = transform_map(level);
    level.map = map;
    return level;
}

export function loadLevels(){
    const levels = [level00, level01, level02, level03, level04,
        level05, level06, level07, level08, level09,
        level10, level11, level12, level13, level14, level15];

    return levels.map(transform_level);
}
