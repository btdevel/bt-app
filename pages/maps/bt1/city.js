import Link from 'next/link';
import Layout from '../../../components/Layout'

const City = () => {
    return (
        <Layout>
            <ul>
            <li><Link href="./[level]" as={`./0`}><a>Scarlet Bard/Cellars</a></Link></li>
            <li><Link href="./[level]" as={`./4`}><a>Mad God Temple/Catacombs</a></Link></li>
            <li><Link href="./[level]" as={`./7`}><a>Baron Harkyn's Castle</a></Link></li>
            <li><Link href="./[level]" as={`./10`}><a>Kylearan's Tower</a></Link></li>
            <li><Link href="./[level]" as={`./11`}><a>Mangars's Tower</a></Link></li>
            </ul>
        </Layout>
    )
}

export default City
