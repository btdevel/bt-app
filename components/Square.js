import styles from './Square.module.scss'
import SpecialIcon from './SpecialIcon'
import loadMonsters, {renderMonsterImage} from './bt1_monsters'
import ToolTip from './ToolTip'


const update = (desc, field, new_text, new_icon, new_class, new_styles) => {
    if (field) {
        const key = Math.random() // Not nice, but no performance issue here
        if (new_text) {
            if (typeof (new_text) === "string")
                desc.text.push(<div key={key}>{new_text}</div>)
            else if (typeof (new_text) === "function")
                desc.text.push(<div key={key}>{new_text(field)}</div>)
            else
                desc.text.push(<div key={key}>??? {new_text}</div>)
        }
        if (new_icon) desc.icon = new_icon
        if (new_class) desc.className = new_class
        if (new_styles) desc.style = Object.assign({}, desc.style, new_styles)
    }
    return desc;
}

const splitString = (text) => (
    text.split("\n").map((line, index) =>
        <span key={index}>{line}<br /></span>
    )
)
const monsters = loadMonsters()

const updateDescription = (element, desc) => {
    update(desc, element.darkness, "Darkness", null, styles.contentDark)

    update(desc, element.encounter, "Random encounter", "random_encounter")
    update(desc, element.stasis_chamber, "Stasis chamber", "stasis_chamber")
    update(desc, element.hitpoint_damage, "Hitpoint damage", "hitpoint_damage")
    update(desc, element.antimagic_zone, "Antimagic zone", "antimagic_zone")
    update(desc, element.spellpoint_restore, "Spellpoint restore", "spellpoint_restore")
    update(desc, element.spinner, "Spinner", "spinner")
    update(desc, element.smoke_zone, "Smoke zone", "smoke_zone")
    update(desc, element.trap, "Trap", "trap");

    update(desc, element.teleport_from, ([i, j]) => <span>Teleport from {i}E, {j}N</span>, "teleport_from")
    update(desc, element.teleport_to, ([i, j]) => <span>Teleport to {i}E, {j}N</span>, "teleport_to")
    update(desc, element.encounter_num_type, ({ num, type }) => <span>Forced encounter: <i>{num} x {monsters[type-1].name}</i> {renderMonsterImage(monsters[type-1].image)}</span>, "forced_encounter")
    update(desc, element.special, msg => (typeof msg === "string" ? <span>Special: <i>{splitString(msg)}</i></span> : "Special"), "special")
    update(desc, element.message, msg => <span>Message:&nbsp;<i>{splitString(msg)}</i></span>, "message")

    update(desc, element.stairs_up, "Stairs up", "stairs_up")
    update(desc, element.stairs_down, "Stairs down", "stairs_down")
    update(desc, element.portal_up, "Portal up", "portal_up")
    update(desc, element.portal_down, "Portal down", "portal_down")
    return desc
}

const Square = ({ element, pos, linkUp, linkDown }) => {
    const [i, j] = pos;
    const desc = {
        text: [<div key="position">Position:&nbsp;{i}E, {j}N</div>],
        icon: null,
        className: styles.contentLight,
        style: {}
    };

    const border_styles = ["", "solid 1px", "dashed 1px", "dashed 1px red"] // Nothing, Wall, Door, Secret Door
    if (element.north)
        desc.style.borderTop = border_styles[element.north];
    if (element.south)
        desc.style.borderBottom = border_styles[element.south];
    if (element.east)
        desc.style.borderRight = border_styles[element.east];
    if (element.west)
        desc.style.borderLeft = border_styles[element.west];

    updateDescription(element, desc);

    const goesUp = element.stairs_up || element.portal_up
    const goesDown = element.stairs_down || element.portal_down
    let linkFunc = goesUp ? linkUp : (goesDown ? linkDown : content => content);

    // console.log(desc.style)
    return (
            <div className={styles.square} style={desc.style}>
                <ToolTip text={desc.text}>
                    <div className={desc.className}>
                        {desc.icon ? linkFunc(<span><SpecialIcon type={desc.icon} /></span>) : <span></span>}
                    </div>
                </ToolTip>
            </div>
        )
}

export default Square;