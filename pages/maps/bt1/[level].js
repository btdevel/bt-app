import Layout from '../../../components/Layout'

import { loadLevels } from '../../../components/bt1_levels'
import LevelMap from '../../../components/LevelMap'

import {useRouter} from 'next/router';
import Link from 'next/link';

const makeLink = (num,child) => (
        <Link href="/maps/bt1/[level]" as={`/maps/bt1/${num}`}>
            <a>{child}</a>
        </Link>
        )
const Level = () => {
    const levels = loadLevels();
    const router = useRouter();
    const levnum = router.query.level;

    console.log(levnum) 
    console.log(levels[levnum]) 
    console.log(levels[levnum]) 

    return (
        <Layout>
            {levels[levnum] ? <LevelMap level={levels[levnum]} makeLink={makeLink}/> : levnum}
        </Layout>)
}

export default Level




