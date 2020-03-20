const Layout = props => {
    return (
        <div>
            <h1>The Bard's Tale</h1>
            {props.children}
        </div>);
}

export default Layout;