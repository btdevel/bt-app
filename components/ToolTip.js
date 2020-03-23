import css from './ToolTip.module.css'

const ToolTip = ({text, children}) => {
    return <div className={css.tooltip}>{children}<span className={css.tooltiptext}>{text}</span></div>
}

export default ToolTip
