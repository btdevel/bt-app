import { Box, Paper, CircularProgress, Backdrop } from '@material-ui/core';
import { Pagination, PaginationItem } from '@material-ui/lab'
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React from 'react';
import { loadLevel } from '../../../components/bt1_levels';
import Layout from '../../../components/Layout';
import { LevelMap, LevelDetails, levelName } from '../../../components/LevelMap';


const makeLink = (num, child) => {
    if ((typeof num) === "string")
        return (<Link href={`/bt1/${num}`}><a>{child}</a></Link>)
    else
        return (<Link href="/bt1/maps/[level]" as={`/bt1/maps/${num}`}><a>{child}</a></Link>)
}

const MyLink = props => {
    return <span key={Math.random()}>{props.children}</span>
}

const LevelChooser = ({levnum}) => (
    <Pagination count={16} defaultPage={levnum + 1} color="primary" showFirstButton showLastButton
        renderItem={(item) => {
            item.page--
            return <PaginationItem {...item} />
        }}
        onChange={(event, value) => {
            const lnum = value - 1;
            console.log(value)
            Router.push("/bt1/maps/[level]", `/bt1/maps/${lnum}`)
        }}
    />)


class LevelLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = { level: null }
    }

    async fetchLevel() {
        const levnum = this.props.levnum;
        const level = await loadLevel(levnum);

        this.setState({ level: level });
        // await setTimeout(() => this.setState({ level: level }), 2000)
    }
    async componentDidMount() {
        this.fetchLevel();
    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.props.levnum != prevProps.levnum) {
            this.fetchLevel();
        }
    }

    render() {
        const level = this.state.level;
        if (!level) return (
            <Layout title={`Loading level ${this.props.levnum}...`}>
                <Backdrop open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Layout>)

        return (
            <Layout title={levelName(level)}>
                <Box component={props => <Paper {...props} />} padding={2}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <Box paddingRight={2}>
                            <LevelMap level={level} makeLink={makeLink} />
                            <Box paddingTop={1} paddingLeft={0}>
                                <LevelChooser levnum={this.props.levnum}/>
                            </Box>
                        </Box>
                        <LevelDetails level={level} open={true} />
                    </div>
                </Box>
            </Layout>)
    }
}


const Level = () => {
    const router = useRouter();
    const levnum = router.query.level && parseInt(router.query.level, 10);

    if (levnum == undefined) { return <span></span> }

    return <LevelLoader levnum={levnum} />
}


export default Level
