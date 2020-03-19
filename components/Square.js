import styles from './Square.module.css'

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

export default Square;