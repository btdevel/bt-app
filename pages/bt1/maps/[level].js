import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { loadLevel } from '../../../components/bt1_levels';
import Layout from '../../../components/Layout';
import LevelMap from '../../../components/LevelMap';


const makeLink = (num,child) => {
    if( (typeof num) === "string" )
        return (<Link href={`/bt1/${num}`}><a>{child}</a></Link>)
    else
        return (<Link href="/bt1/maps/[level]" as={`/bt1/maps/${num}`}><a>{child}</a></Link>)
}

class LevelX extends React.Component {
    constructor(props) {
        super(props);
        this.state = {level: null}
    }

    render() {
        const level = this.state.level;

        return (level ? <LevelMap level={level} makeLink={makeLink}/> : <span>"Loading..."</span>)
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

    if( levnum==undefined ) {return <span></span>}

    return (
        <Layout>
            <div>
                <LevelX levnum={levnum}/>
            </div>
        </Layout>)
}


export default Level
