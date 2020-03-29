import { Box, Paper } from '@material-ui/core'
import CityMap from '../../components/CityMap'
import Layout from '../../components/Layout'

const City = () => {
    return (
        <Layout title="Map of Skara Brae">
            <Box component={props => <Paper {...props}/>} p={2}>
                <CityMap/>
            </Box>
        </Layout>
    )
}

export default City
