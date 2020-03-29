import { AppBar, Collapse, Divider, Drawer, List, ListItem, ListItemText, Toolbar, Typography } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import css from './Layout.module.scss';


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


const SideNavigation = () => (
    <Drawer className={css.drawer} variant="permanent" classes={{ paper: css.drawerPaper, }} anchor="left">
        <List>
            <MyLink href="/bt1/city" name="City" />
            <Divider />
            <ExpandableList title="Dungeons">
                <MyLink href="/bt1/maps/[level]" as="/bt1/maps/0" name="Wine Cellar/Sewers" nestLevel={1} />
                <MyLink href="/bt1/maps/[level]" as="/bt1/maps/4" name="Catacombs" nestLevel={1} />
                <MyLink href="/bt1/maps/[level]" as="/bt1/maps/7" name="Harkyn's Castle" nestLevel={1} />
                <MyLink href="/bt1/maps/[level]" as="/bt1/maps/10" name="Kylearan's Tower" nestLevel={1} />
                <MyLink href="/bt1/maps/[level]" as="/bt1/maps/11" name="Mangar's Tower" nestLevel={1} />
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
            <SideNavigation />
            <div className={css.content}>
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
