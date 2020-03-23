import Link from 'next/link';
import Layout from '../../../components/Layout'
import CityMap from '../../../components/CityMap'

const SimpleCity = () => {
    return (
            <ul>
            <li><Link href="/maps/bt1/[level]" as={`/maps/bt1/0`}><a>Scarlet Bard/Cellars</a></Link></li>
            <li><Link href="/maps/bt1/[level]" as={`/maps/bt1/4`}><a>Mad God Temple/Catacombs</a></Link></li>
            <li><Link href="/maps/bt1/[level]" as={`/maps/bt1/7`}><a>Baron Harkyn's Castle</a></Link></li>
            <li><Link href="/maps/bt1/[level]" as={`/maps/bt1/10`}><a>Kylearan's Tower</a></Link></li>
            <li><Link href="/maps/bt1/[level]" as={`/maps/bt1/11`}><a>Mangars's Tower</a></Link></li>
            </ul>
    )
}

const City = () => {
    return (
        <Layout>
            <SimpleCity/>
            <CityMap/>
        </Layout>
    )
}

export default City
