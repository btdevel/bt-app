// import Drawer from '@material-ui/core/Drawer'
// import Divider from '@material-ui/core/Divider'
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
import { Button, Paper } from '@material-ui/core'
import Link from 'next/link'
import css from './Layout.module.scss'

// import {Theme, makeStyles, createStyles } from '@material-ui/core/styles'


// const drawerWidth = 240;

const MyLink = ({ href, name, ...rest }) => (
    // <Link href={href}><Button>{name}</Button></Link>
    <Link href={href} passHref {...rest}><Button component="a">{name}</Button></Link>
    // <Link href={href}><a>{name}</a></Link>
    // <Link href={href}>{name}</Link>
)

// const useStyles = makeStyles( theme =>
//     createStyles({
//         drawer: {
//             width: drawerWidth,
//             flexShrink: 0,
//           },    
//         content: {
//             flexGrow: 1,
//             padding: theme.spacing(3),
//             // paddingLeft: "20em",
//             // backgroundColor: "#F00"
//         }
//     })
// )

// const Layout = ({ children }) => {
//     const classes = useStyles()
//     return (
//         <div>
//             <Drawer open={false} variant={"permanent"}>
//                 <List>
//                     <ListItem>
//                         <ListItemText><MyLink href="/maps/bt1/city" name="City"></MyLink></ListItemText>
//                     </ListItem>
//                     <Divider />
//                     <ListItem>
//                         <ListItemText><MyLink href="/maps/bt1/0" name="Cellars"></MyLink></ListItemText>
//                     </ListItem>
//                     <ListItem>
//                         <ListItemText><MyLink href="/maps/bt1/4" name="Catacombs"></MyLink></ListItemText>
//                     </ListItem>
//                     {/* <ListItem>
//                         <ListItemText><Link href="maps/bt1/maps/0"><Button>Cellars</Button></Link></ListItemText>
//                     </ListItem> */}
//                     {/* <ListItem>
//                         <ListItemText><NextLink>City</NextLink></ListItemText>
//                     </ListItem> */}
//                     {/* <Divider />
//                     <ListItem>
//                         <ListItemText><NextLink>Dungeons</NextLink></ListItemText>
//                     </ListItem> */}
//                 </List>
//             </Drawer>
//             <main className={classes.content}>
//                 <Paper elevation={3}>
//                     {children}
//                 </Paper>
//             </main>
//         </div>)
// }
// // const Layout = props => {
// //     return (
// //         <div>
// //             <h1>The Bard's Tale 1</h1>
// //             {props.children}
// //         </div>);
// // }



// export default Layout;






import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


// const drawerWidth = "10rem";

// const useStyles = makeStyles((theme) =>
//     createStyles({
//         root: {
//             display: 'flex',
//         },
//         appBar: {
//             width: `calc(100% - ${drawerWidth})`,
//             marginLeft: drawerWidth,
//         },
//         drawer: {
//             width: drawerWidth,
//             flexShrink: 0,
//         },
//         drawerPaper: {
//             width: drawerWidth,
//         },
//         // necessary for content to be below app bar
//         toolbar: theme.mixins.toolbar,
//         content: {
//             flexGrow: 1,
//             backgroundColor: theme.palette.background.default,
//             padding: theme.spacing(3),
//         },
//     }),
// );

export default function Layout({ children }) {
    // const classes = useStyles();
    // const css = {}
    return (
        <div className={css.root}>
            <Drawer className={css.drawer} variant="permanent" classes={{paper: css.drawerPaper,}} anchor="left">
                {/* <div className={css.toolbar} /> */}
                <Divider />
                <List>
                    <ListItem button>
                        <ListItemText>
                            {<MyLink href="/maps/bt1/city" name="City"></MyLink>}
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText>Dungeons</ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemText><MyLink href="/maps/bt1/[level]" as="/maps/bt1/0" name="Cellars"></MyLink></ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemText><MyLink href="/maps/bt1/[level]" as="/maps/bt1/4" name="Catacombs"></MyLink></ListItemText>
                    </ListItem>
                </List>
            </Drawer>
            <div className={css.content}>
                {/* <div className={css.toolbar} /> */}
                {children}
            </div>
        </div>
    );
}
