import css from './MapGrid.module.scss'

const MapGridCss = ({width, height, showNumbers, children}) => {

    const colsStyle = { gridTemplateColumns: `repeat(${width}, 1.5rem)`}
    const rowsStyle = { gridTemplateRows: `repeat(${height}, 1.5rem)` }

    if(children == undefined) children = [];
    const elements = []
    let count = 0;
    for(let i=0; i<width; i++) {
        for(let j=0; j<height; j++){
            elements.push(<div key={[i,j]} className={css.gridCell}><div className={css.gridInner}>{children[count]}</div></div>)
            count++;
        }
    }
    return (
        <div className={css.outerGrid}>
            <div className={css.vertNumbering} style={rowsStyle}>
                {Array.from(Array(height).keys()).map( num => <div key={num} className={css.gridCellVert}>{num}</div>)}
            </div>
            <div className={css.levelMap} style={Object.assign({}, rowsStyle, colsStyle)}>
                {elements}
            </div>
            <div className={css.gridCellEdge}></div>
            <div className={css.horzNumbering} style={colsStyle}>
                {Array.from(Array(width).keys()).map( num => <div key={num} className={css.gridCellHorz}>{num}</div>)}
            </div>
        </div>
        // <div className={styles.levelMap}>{children}</div>
    )
}



const MapGridTable = ({width, height, showNumbers, children}) => {
    const content = [];
    let count = 0;
    if(children == undefined) children = [];

    for(let i=0; i<height; i++){
        const row = [];
        row.push(<th className={css.left}>{height-i}</th>)
        for(let j=0; j<width; j++){
            row.push(<td>{children[count]}</td>)
            count++;
        }
        content.push(<tr>{row}</tr>)
    }
    const row = [<th className={css.edge}></th>];
    for(let j=0; j<width; j++){
        row.push(<th className={css.bottom}>{j}</th>)
    }
    content.push(<tr>{row}</tr>)

return <table className={css.grid}>{content}</table>
}

const MapGrid = ({type, ...props}) => (
    type=="grid" ? <MapGridCss {...props}/> : <MapGridTable {...props}/>
)
export default MapGrid;
