import Square from './Square'
import MapGrid from './MapGrid'
import { Fragment } from 'react'
import { loadLevel } from './bt1_levels'

export const levelName = level => (
    level.fullName || `${level.dungeon_name} ${level.level_number - level.nmax[0] + 1}`
)

export const LevelDetails = ({ level, open }) => {
    return (
        <Fragment>
            <details open={open}>
                <summary><b>Level information</b></summary>
                <table>
                    <tbody>
                        <tr><td>Number: </td><td>{level.level_number}</td></tr>
                        <tr><td>Dungeon name: </td><td>{level.dungeon_name}</td></tr>
                        <tr><td>Wall style: </td><td>{level.wall_style}</td></tr>
                        <tr><td>Phase door: </td><td>{level.phase_door ? "Allowed" : "Not allowed"}</td></tr>
                        <tr><td>Direction: </td><td>{level.goes_down ? "Down" : "Up"}</td></tr>
                        <tr><td>Monster difficulty: </td><td>{level.monster_difficulty}</td></tr>
                        <tr><td>City entry/exit: </td><td>{level.entry_position[0]}E, {level.entry_position[1]}N</td></tr>

                        <tr><td><br/>Level group</td><td></td></tr>
                        {
                            level.nmax.filter( lnum => lnum<255).map( (lnum, index) =>
                            <tr key={lnum}><td>Level {lnum}</td><td>Teleport {level.apar[index] < 255 ? "allowed" : "disallowed"}</td></tr>
                            )
                        }
                        {/* <tr><td>APAR: </td><td>{level.apar.join(", ")}</td></tr> */}
                        {/* <tr><td>NMAX: </td><td>{level.nmax.join(", ")}</td></tr> */}
                    </tbody>
                </table>
            </details>
        </Fragment>)
}

export const LevelMap = ({ level, makeLink }) => {
    const lmap = level.map;
    const levnum = level.level_number;

    makeLink = makeLink || ((num, child) => child)
    const prevIsCity = levnum == level.nmax[0];
    const linkNext = child => makeLink(levnum + 1, child)
    const linkPrev = child => makeLink(levnum - 1, child)
    const linkCity = child => makeLink('city', child)
    const linkUp = level.goes_down ? (prevIsCity ? linkCity : linkPrev) : linkNext
    const linkDown = level.goes_down ? linkNext : (prevIsCity ? linkCity : linkPrev)

    const { width, height } = level
    const map = []
    for (let j = height - 1; j >= 0; j--) {
        const row = []
        for (let i = 0; i < width; i++) {
            const element = lmap[i][j];
            map.push(<Square key={[i, j]} element={element} pos={[i, j]} linkUp={linkUp} linkDown={linkDown} />)
        }
    }

    return (
        <MapGrid width={level.width} height={level.height}>
            {map}
        </MapGrid>)
}

export default LevelMap;
