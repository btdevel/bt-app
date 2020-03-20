import Layout from '../../../components/Layout'

import { loadLevels, loadLevel } from '../../../components/bt1_levels'
import LevelMap from '../../../components/LevelMap'

import {withRouter, useRouter} from 'next/router';
import Link from 'next/link';

import React from 'react'
import { render } from 'react-dom';

const makeLink = (num,child) => (
        <Link href="/maps/bt1/[level]" as={`/maps/bt1/${num}`}>
            <a>{child}</a>
        </Link>
        )

class LevelX extends React.Component {
    constructor(props) {
        super(props);
        this.state = {level: null}
    }

    render() {
        const level = this.state.level;

        return (
            <Layout>
                {level ? <LevelMap level={level} makeLink={makeLink}/> : "Loading..."}
            </Layout>)
    }

    async fetchLevel() {
        const levnum = this.props.levnum;
        console.log({CDM_levnum: levnum})
        const level = await loadLevel(levnum);
        this.setState({level: level});
    }
    async componentDidMount() {
        this.fetchLevel();
    }
    async componentDidUpdate(prevProps, prevState) {
        if( this.props.levnum != prevProps.levnum ) {
            this.fetchLevel();
        }
    }
}


const Level = () => {
    const myParseInt = str => ((str===null || str===undefined) ? str : parseInt(str))
    const router = useRouter();
    const levnum = myParseInt(router.query.level);

    if( levnum==undefined ) return <span></span>

    return <LevelX levnum={levnum}/>
}


export default Level
