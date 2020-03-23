import MapGrid from './MapGrid'
import ToolTip from './ToolTip'
import React from 'react'
import { loadCity } from './bt1_city'
import css from './CityMap.module.scss'

class CityMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        // const city = await loadCity();
        if (this.state.city == undefined) return <div>Loading...</div>
        const elements = Array(900);

        const city = this.state.city;
        let count = 0;
        console.log(city)
        console.log(city.pattern)
        console.log(city.pattern[0])
        console.log(city.pattern[0][0])
        const types = city.types;
        // streets, street_names

        for (let i = 0; i < 30; i++) {
            for (let j = 0; j < 30; j++) {
                let element;
                const field = city.pattern[i][j]
                switch (field) {
                    case "00":
                    case "78":
                        element = <div></div>
                        break;
                    case "60":
                        element = <div>o</div>
                        break;
                    case "68":
                        element = <div>X</div>
                        break;
                    default:
                        element = <div className={css.house}></div>
                }
                // !="00" && city.pattern[i][j]!="60"&&city.pattern[i][j]!="68"&&city.pattern[i][j]!="78") {
                
                elements[count] = <ToolTip text={types[field]}>{element}</ToolTip>;
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
