import { Button, Paper } from '@material-ui/core'
import Link from 'next/link'
import Head from 'next/head'
import css from './Layout.module.scss'
import PropTypes from 'prop-types'

const MyLink = ({ href, name, ...rest }) => (
    // <ListItem button>
    //     <ListItemText>
    //         <Link href={href} passHref {...rest}><Button component="a">{name}</Button></Link>
    //     </ListItemText>
    // </ListItem>

    // Dieser Code hier erzeugt ein List Item mit einem darin befindlichen Button/Link
    <Link href={href} passHref {...rest}>
        <ListItem button>
            <ListItemText>
                {name}
            </ListItemText>
        </ListItem>
    </Link>
)



import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';



export default function Layout({ title, children }) {
    return (
        <div className={css.root}>
            <Head>
                <title>{title}</title>
            </Head>
            <Drawer className={css.drawer} variant="permanent" classes={{paper: css.drawerPaper,}} anchor="left">
                {/* <div className={css.toolbar} /> */}
                {/* <Divider /> */}
                <List>
                    <MyLink href="/bt1/city" name="City"/>
                    <Divider />
                    <ListItem><ListItemText><b>Dungeons</b></ListItemText></ListItem>
                    <MyLink href="/bt1/maps/[level]" as="/bt1/maps/0" name="Cellars"/>
                    <MyLink href="/bt1/maps/[level]" as="/bt1/maps/4" name="Catacombs"/>
                    <MyLink href="/bt1/maps/[level]" as="/bt1/maps/7" name="Castle"/>
                    <MyLink href="/bt1/maps/[level]" as="/bt1/maps/10" name="Kylearans"/>
                    <MyLink href="/bt1/maps/[level]" as="/bt1/maps/11" name="Mangars"/>
                    <Divider/>
                    <MyLink href="/bt1/monsters" name="Monsters"/>
                </List>
            </Drawer>
            <div className={css.content}>
                <AppBar position="static"/>
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
