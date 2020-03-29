import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Button, Paper, Collapse, ListItemIcon } from '@material-ui/core'
import Link from 'next/link'
import Head from 'next/head'
import css from './Layout.module.scss'
import PropTypes from 'prop-types'
import { ExpandLess, ExpandMore } from '@material-ui/icons'

const MyLink = ({ href, name, nestLevel, ...rest }) => {
    // Dieser Code hier erzeugt ein List Item mit einem darin befindlichen Button/Link
    const text = <ListItem button={!!href} dense={true} >
        <ListItemText>
            {href ? name : <del>{name}</del>}
        </ListItemText>
    </ListItem>

    if (href)
        return <Link href={href} passHref {...rest}>{text}</Link>
    else
        return text
}
MyLink.defaultProps = {
    nestLevel: 0,
    href: null
}




const ExpandableList = ({ title, children }) => {
    const [isOpen, setOpen] = useState(true)
    return (
        <React.Fragment>
            <ListItem button onClick={() => setOpen(!isOpen)} dense={true}>
                <ListItemText primary={<b>{title}</b>} />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={isOpen} style={{ paddingLeft: "2em" }}>
                <List component="div" disablePadding>
                    {children}
                </List>
            </Collapse>
        </React.Fragment>
    )
}

const Structure = () => (
    <Drawer className={css.drawer} variant="permanent" classes={{ paper: css.drawerPaper, }} anchor="left">
        {/* <div className={css.toolbar} /> */}
        {/* <Divider /> */}
        <List>
            <MyLink href="/bt1/city" name="City" />
            <Divider />
            <ExpandableList title="Dungeons">
                <MyLink href="/bt1/maps/[level]" as="/bt1/maps/0" name="Cellars" nestLevel={1} />
                <MyLink href="/bt1/maps/[level]" as="/bt1/maps/4" name="Catacombs" nestLevel={1} />
                <MyLink href="/bt1/maps/[level]" as="/bt1/maps/7" name="Castle" nestLevel={1} />
                <MyLink href="/bt1/maps/[level]" as="/bt1/maps/10" name="Kylearans" nestLevel={1} />
                <MyLink href="/bt1/maps/[level]" as="/bt1/maps/11" name="Mangars" nestLevel={1} />
            </ExpandableList>
            <Divider />
            <ExpandableList title="Lists">
                <MyLink href="/bt1/monsters" name="Monsters" />
                <MyLink name="Classes" />
                <MyLink name="Items" />
                <MyLink name="Songs" />
                <MyLink name="Spells" />
            </ExpandableList>
            <Divider />
            <ExpandableList title="Hacking">
                <MyLink href="/bt1/hacking/asm_decode" name="Decoding" />
                <MyLink name="Edit character" />
                <MyLink name="Edit item list" />
            </ExpandableList>
        </List>
    </Drawer>
)

export default function Layout({ title, children }) {
    return (
        <div className={css.root}>
            <Head>
                <title>{title}</title>
            </Head>
            <Structure />
            <div className={css.content}>
                {/* <AppBar position="static" /> */}
                <AppBar position="static">
                    <Toolbar>
                        {/* <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton> */}
                        <Typography variant="h6">
                            {title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                {/* <div className={css.toolbar} /> */}
                {/* <h1>{title}</h1> */}
                {children}
            </div>
        </div>
    );
}

Layout.propTypes = {
    title: PropTypes.string
}
Layout.defaultProps = {
    title: ""
}
