import styles from './Square.module.css'
import SpecialIcon from './SpecialIcon'
import { monsters } from './bt1_monsters'



const update = (desc, field, new_text, new_icon, new_styles) => {
    if( field ) { 
        // const key = new_icon || "darkness"
        // const key = "foo"
        const key = Math.random()
        if( new_text && typeof(new_text)==="string") desc.text.push(<div key={key}>{new_text}</div>)
        if( new_text && typeof(new_text)==="function") desc.text.push(<div key={key}>{new_text(field)}</div>)
        if( new_icon ) desc.icon = new_icon
        if( new_styles ) desc.style = Object.assign({}, desc.style, new_styles)
    }
    return desc;
}

const splitString = (text) => (
    text.split("\n").map((line, index) =>
        <span key={index}>{line}<br/></span>
    )
)
const updateDescription = (element, desc) => {
    update( desc, element.darkness, "Darkness", null, {"backgroundColor": "darkgray"})
    update( desc, element.special, "Special", "special")

    update( desc, element.encounter, "Random encounter", "random_encounter")
    update( desc, element.stasis_chamber, "Stasis chamber", "stasis_chamber")
    update( desc, element.hitpoint_damage, "Hitpoint damage", "hitpoint_damage")
    update( desc, element.antimagic_zone, "Antimagic zone", "antimagic_zone")
    update( desc, element.spellpoint_restore, "Spellpoint restore", "spellpoint_restore")
    update( desc, element.spinner, "Spinner", "spinner")
    update( desc, element.smoke_zone, "Smoke zone", "smoke_zone")
    update( desc, element.trap, "Trap", "trap");

    update( desc, element.teleport_from, ([i,j]) => <span>Teleport from {i}E, {j}N</span>, "teleport_from")
    update( desc, element.teleport_to, ([i,j]) => <span>Teleport to {i}E, {j}N</span>, "teleport_to")
    update( desc, element.encounter_num_type, ({num, type}) => <span>Forced encounter: {num} x {monsters[type]}</span>, "forced_encounter")
    update( desc, element.message, field => <span>Message:&nbsp;{splitString(field)}</span>, "message")

    update( desc, element.stairs_up, "Stairs up", "stairs_up")
    update( desc, element.stairs_down, "Stairs down", "stairs_down")
    update( desc, element.portal_up, "Portal up", "portal_up")
    update( desc, element.portal_down, "Portal down", "portal_down")
    return desc
}

const Square = ({element, pos, linkUp, linkDown})=> {
    const [i, j] = pos;
    const classNames = [styles.square];

    let style = {};
    const border_styles = ['', 'solid 1px', 'dashed 1px', 'red 2px dashed'] // Nothing, Wall, Door, Secret Door
    style.fontSize = "small"
    
    if( element.north )
        style.borderTop = border_styles[element.north];
    if( element.south )
        style.borderBottom = border_styles[element.south];
    if( element.east)
        style.borderRight = border_styles[element.east];
    if( element.west )
        style.borderLeft = border_styles[element.west];

    let text = [<div key="position">Position:&nbsp;{i}E, {j}N</div>]
    const desc = updateDescription(element, {text: text, icon: null, style: style});
    const icon = desc.icon;
    style = desc.style;
    text = desc.text;

    const goesUp = element.stairs_up || element.portal_up
    const goesDown = element.stairs_down || element.portal_down
    let linkFunc = goesUp ? linkUp : (goesDown ? linkDown : content => content);

    return (<div className={classNames} style={style}>
        {icon ? linkFunc(<span><SpecialIcon type={icon}/></span>) : ""}
        <div className={styles.tooltip}><span className={styles.tooltiptext}>{text}</span></div>
    </div>)
}

export default Square;