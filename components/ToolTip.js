import css from './ToolTip.module.css'

const ToolTip = ({text, children}) => {
    return <div key={Math.random()} className={css.tooltip}>{children}<div key={Math.random()} className={css.tooltiptext}>{text}</div></div>
}

export default ToolTip
