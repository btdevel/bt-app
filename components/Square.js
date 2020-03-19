import styles from './Square.module.css'

import { monsters } from './bt1_monsters'

const Square = ({element, pos})=> {
    const [i, j] = pos;
    const classNames = [styles.square];

    const style = {};
    const border_styles = ['', 'solid 1px', 'dashed 1px', 'red 2px dashed'] // Nothhing, Wall, Door, Secret Door
    style.fontSize = "small"
    
    if( element.north )
        style.borderTop = border_styles[element.north];
    if( element.south )
        style.borderBottom = border_styles[element.south];
    if( element.east)
        style.borderRight = border_styles[element.east];
    if( element.west )
        style.borderLeft = border_styles[element.west];
        
    if( element.darkness )
        style.backgroundColor = "darkgray";

    //row.push(<Square key={[i,j]} style={styles}><span >{i},{j}</span></Square>)
    const text = [<div>Position:&nbsp;{i}E, {j}N</div>]
    if(element.message){
        text.push(<div>Message:&nbsp;{element.message}}</div>)
    }
    if(element.stairs_prev) text.push(<div>Stairs to previous level</div>)
    if(element.stairs_next) text.push(<div>Stairs to next level</div>)
    if(element.portal_down) text.push(<div>Portal down</div>)
    if(element.portal_up  ) text.push(<div>Portal up</div>)

    // if(element.special    ) text.push(<div>Special</div>)

    // if(element.darkness   ) text.push(<div>Darkness</div>)
    if(element.smoke_zone ) text.push(<div>Smoke</div>)
    if(element.trap       ) text.push(<div>Trap</div>)
    if(element.encounter  ) text.push(<div>Random encounter</div>)
    if(element.stasis_chamber ) text.push(<div>Stasis chamber</div>)
    if(element.hitpoint_damage  ) text.push(<div>Hitpoint damage</div>)
    if(element.antimagic_zone  ) text.push(<div>Antimagic zone</div>)
    if(element.spellpoint_restore) text.push(<div>Spellpoint restore</div>)
    if(element.spinner) text.push(<div>Spinner</div>)
    
    // hitpoint_damage, smoke_zones, stasis_chambers, antimagic_zones, spellpoint_restore, spinners



    if(element.encounter_num_type  ) {
        const {num, type} = element.encounter_num_type
        text.push(<div>Forced encounter: {num} x {monsters[type]}</div>)
    }
    if( element.teleport_from ) {
        const [i, j] = element.teleport_from;
        text.push(<div>Teleport from {i}E, {j}N</div>)
    }
    if( element.teleport_to ) {
        const [i, j] = element.teleport_to;
        text.push(<div>Teleport to {i}E, {j}N</div>)
    }

    // if( element.darkness) classNames.push(styles.darkness)

    const content = [];
    content.push(<span>{text.length>1 ? "?" : ""}</span>)
    content.push(<div className={styles.tooltip}><span className={styles.tooltiptext}>{text}</span></div>)

    return <div className={classNames} style={style}><div>{content}</div></div>
}

export default Square;