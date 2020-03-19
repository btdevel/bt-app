// import fetch from 'isomorphic-unfetch';
import level00 from '../res/levels/level_00.json'
import level01 from '../res/levels/level_01.json'
import level02 from '../res/levels/level_02.json'
import level03 from '../res/levels/level_03.json'
import level04 from '../res/levels/level_04.json'
import level05 from '../res/levels/level_05.json'
import level06 from '../res/levels/level_06.json'
import level07 from '../res/levels/level_07.json'
import level08 from '../res/levels/level_08.json'
import level09 from '../res/levels/level_09.json'
import level10 from '../res/levels/level_10.json'
import level11 from '../res/levels/level_11.json'
import level12 from '../res/levels/level_12.json'
import level13 from '../res/levels/level_13.json'
import level14 from '../res/levels/level_14.json'
import level15 from '../res/levels/level_15.json'

import styles from './Square.module.css'
import { Fragment } from 'react'

const Square = ({element, pos})=> {
    const [i, j] = pos;
    const classNames = [styles.square];

    const style = {};
    style.fontSize = "xx-small"
    style.fontSize = "small"
    style.borderWidth = "1px"
    if( element.north )
        style.borderTopStyle = 'solid';
    if( element.south )
        style.borderBottomStyle = 'solid';
    if( element.east)
        style.borderRightStyle = 'solid';
    if( element.west )
        style.borderLeftStyle = 'solid';

    if(element.darkness) {
        style.backgroundColor = 'darkgray';
    }
    
    //row.push(<Square key={[i,j]} style={styles}><span >{i},{j}</span></Square>)
    const text = [<div>Pos:&nbsp;({i},{j})</div>]
    if(element.message){
        text.push(<div>Msg:&nbsp;{element.message}}</div>)
    }

    const content = [];
    content.push(<span>{element.message ? "?" : ""}</span>)
    content.push(<div className={styles.tooltip}><span className={styles.tooltiptext}>{text}</span></div>)

    return <div className={classNames} style={style}><div>{content}</div></div>
}

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

const LevelMap = ({levnum, level}) => {
    const lmap = transform_map(level);

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

const Index = props => {
    const levels = [level00, level01, level02, level03, level04,
                    level05, level06, level07, level08, level09,
                    level10, level11, level12, level13, level14, level15];
    // const levnum = 10;
    // const level = levels[levnum];
    // level.width = 22;
    // level.height = 22;
    // return (<div>Foobar
    //     <LevelMap levnum={levnum} level={level}/>
    // </div>)


    const content = []
    for(let levnum = 0; levnum<levels.length; levnum++) {
        const level = levels[levnum];
        level.width = 22;
        level.height = 22;
        content.push(<LevelMap levnum={levnum} level={level}/>)
    }
    return (<div>{content}</div>)
    
}


export default Index;
