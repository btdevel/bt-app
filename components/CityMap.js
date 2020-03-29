import { Backdrop, CircularProgress } from '@material-ui/core'
import React from 'react'
import { loadCity } from './bt1_city'
import css from './CityMap.module.scss'
import Layout from './Layout'
import MapGrid from './MapGrid'
import ToolTip from './ToolTip'

class CityMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const city = this.state.city;

        if (city == undefined) return (
            // <Layout title={`Loading level city map...`}>
                <Backdrop open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            // </Layout>
            )

        const elements = Array(900);

        let count = 0;
        // console.log(city)
        // console.log(city.pattern)
        // console.log(city.pattern[0])
        // console.log(city.pattern[0][0])
        const types = city.types;
        const streets = city.streets;
        const street_names = city.street_names;

        for (let i = 0; i < 30; i++) {
            for (let j = 0; j < 30; j++) {
                let element;
                const field = city.pattern[i][j]
                const street = city.streets[i][j]
                const text = [<div key="type">{types[field]}</div>];
                switch (field) {
                    case "00":
                    case "78":
                        element = <div></div>
                        text.push([<div key="street">{street_names[street]}</div>]);
                        break;
                    case "60":
                        element = <div>o</div>
                        break;
                    case "68":
                        element = <div>X</div>
                        break;
                    default:
                        element = <div className={css.house}></div>
                        if (field <= "04") {

                            text.push(<img key="img" width="50%" height="50%" src={`/image/bt1/house${field[1]}/F0.png`}></img>)
                        }
                }
                // !="00" && city.pattern[i][j]!="60"&&city.pattern[i][j]!="68"&&city.pattern[i][j]!="78") {

                elements[count] = <ToolTip key={[i, j]} text={text}>{element}</ToolTip>;
                count++;
            }
        }
        return (
            <MapGrid height={30} width={30} cellSize={"80%"}>
                {elements}
            </MapGrid>
        )
    }

    async componentDidMount() {
        const city = await loadCity();
        this.setState({ city: city })
    }
}

export default CityMap;
