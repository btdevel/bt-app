import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'

const iconMap = {
    "message": fa.faComment,
    "special": fa.faExclamationTriangle,
    "darkness": fa.faCircle,
    "stairs_up": fa.faArrowCircleUp,
    "stairs_down": fa.faArrowCircleDown,
    "portal_up": fa.faAngleDoubleUp,
    "portal_down": fa.faAngleDoubleDown,
    "smoke_zone": fa.faCloud,
    "trap": fa.faBomb,
    // "trap": fa.faSkullCrossbones,
    "random_encounter": fa.faDice,
    "forced_encounter": fa.faGhost,
    "stasis_chamber": fa.faStreetView,
    "hitpoint_damage": fa.faAngry,
    //"antimagic_zone": fa.faStopCircle,
    "antimagic_zone": fa.faBan,
    "spellpoint_restore": fa.faBandAid,
    "spinner": fa.faSyncAlt,
    "teleport_to": fa.faPlaneDeparture,
    "teleport_from": fa.faPlaneArrival,
}
const sizeMap = {
    "random_encounter": "100%",
    "spellpoint_restore": "100%",
    "teleport_to": "11  0%",
    "teleport_from": "110%",
}

const colorTransport = "darkblue"
const colorEvil = "darkred"

const colorMap = {
    "forced_encounter": colorEvil,
    "random_encounter": colorEvil,
    "stasis_chamber": colorEvil,
    "trap": colorEvil,
    "hitpoint_damage": colorEvil,
    "antimagic_zone": colorEvil,

    "portal_up": colorTransport,
    "portal_down": colorTransport,
    "stairs_up": colorTransport,
    "stairs_down": colorTransport,
    "teleport_from": colorTransport,
    "teleport_to": colorTransport,
    "spinner": colorTransport,

    "smoke_zone": "darkgray",
}

export default function SpecialIcon({type}) {
    let icon = iconMap[type];
    const size = sizeMap[type] || "120%"
    const color = colorMap[type] || "black"

    if( !icon ) {
        console.warn(`SpecialIcon: Icon name ${type} not found `)
        icon = fa.faQuestion;
    }

    return (
        <FontAwesomeIcon icon={icon} 
        style={{fontSize: size, margin: "3px", color: color}}/>
    )
}

// <i class="far fa-arrow-alt-circle-down"></i>
// <i class="fas fa-arrow-alt-circle-down"></i>
// <i class="fas fa-arrow-alt-circle-up"></i>
// <i class="far fa-arrow-alt-circle-up"></i>
// <i class="fas fa-arrow-circle-down"></i>
// <i class="fas fa-arrow-circle-up"></i>
// <i class="fas fa-arrow-down"></i>
// <i class="fas fa-arrow-up"></i>
// <i class="fas fa-caret-square-down"></i>
// <i class="fas fa-caret-square-up"></i>
// <i class="fas fa-chevron-circle-down"></i>
// <i class="fas fa-chevron-circle-up"></i>

// <i class="fas fa-circle"></i>
// <i class="far fa-circle"></i>
// <i class="fas fa-expand-arrows-alt"></i>
// <i class="fas fa-exclamation-circle"></i>
// <i class="fas fa-exclamation-triangle"></i>

// <i class="fas fa-angle-double-down"></i>
// <i class="fas fa-angle-double-up"></i>


// # HP drain
// <i class="fas fa-frown-open"></i>
// <i class="fas fa-angry"></i>
// <i class="far fa-angry"></i>

// # SP restore
// <i class="fas fa-book-medical"></i>
// <i class="fas fa-first-aid"></i>
// <i class="fas fa-ambulance"></i>
// <i class="fas fa-band-aid"></i>

// # Stasis
// <i class="fas fa-expand"></i>
// <i class="fas fa-ban"></i>
// <i class="fas fa-stop-circle"></i>
// <i class="fas fa-street-view"></i>

// # Encounter
// <i class="fas fa-dragon"></i>
// <i class="fas fa-ghost"></i>
// <i class="fab fa-optin-monster"></i>
// <i class="fas fa-pastafarianism"></i>

// # Random encounter
// <i class="fas fa-dice"></i>

// # Trap
// <i class="fas fa-bomb"></i>
// <i class="fas fa-book-dead"></i>

// # Smoke
// <i class="fas fa-cloud"></i>
// <i class="fas fa-eye-slash"></i>
// <i class="far fa-eye-slash"></i>
// <i class="fas fa-align-center"></i>

// # Spinner
// <i class="fas fa-life-ring"></i>
// <i class="fas fa-random"></i>
// <i class="fas fa-spinner"></i>
// <i class="fas fa-sync-alt"></i>

// # Message
// <i class="fas fa-comment"></i>
// <i class="far fa-comment"></i>
// <i class="fas fa-comment-alt"></i>
// <i class="far fa-comment-alt"></i>
// <i class="fas fa-comment-dots"></i>
// <i class="far fa-comment-dots"></i>

// # Teleport
// <i class="fas fa-anchor"></i>
// <i class="fab fa-telegram-plane"></i>
// <i class="fas fa-plane-arrival"></i>
// <i class="fas fa-plane-departure"></i>
