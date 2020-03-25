import Layout from 'components/Layout'
import loadMonsters from 'components/bt1_monsters'

import MaterialTable from 'material-table'
import tableIcons from '../../components/tableIcons'
import Tooltip from '@material-ui/core/Tooltip'

const renderImage = (num) => {
    const url = `/image/bt1/gifs/amiga/bt1-${num}.gif`
    return <Tooltip title={<img style={{transform: "scale(2)"}} src={url}/>}><img style={{height: "3em"}} src={url}/></Tooltip>
}
const Monsters = () => {
    const monsters = loadMonsters();
    const contents = <MaterialTable
        title="BT1 Monsters"
        columns = {[
            {title: "Number", field: "dec"},
            {title: "Name", field: "name"},
            {title: "AC", field: "ac"},
            {title: "HP min.", field: "hpMin"},
            {title: "HP max.", field: "hpMax"},
            {title: "Exp", field: "xp"},
            {title: "Max. Group", field: "group"},
            {title: "Special", field: "special"},
            {title: "Image", field: "image", render: rowData => 
                (rowData.image ? renderImage(rowData.image) : "") }
        ]}
        data = {monsters}
        icons = {tableIcons}
        options = {{
            paging: false,
            search: true,
            exportButton: true,
            padding: "dense",
        }}

    />

    return <Layout title="Monsters">
        {contents}
    </Layout>
}
export default Monsters