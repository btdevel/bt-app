import css from './ToolTip.module.css'

const ToolTip = ({text, children}) => {
    return <div className={css.tooltip}>{children}<div className={css.tooltiptext}>{text}</div></div>
}

export default ToolTip
