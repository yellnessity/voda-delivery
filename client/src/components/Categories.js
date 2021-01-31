import React from 'react'
import { ButtonGroup, ToggleButton } from 'react-bootstrap'

// function Categories({ onClickItem })

const Categories = React.memo(function Categories({ activeWater, activeVolume, categories, filters }) {

    // const water = ["Still", "Sparkling", "Sport"]
    // const volumes = [0.3, 0.5, 1, 5, 12]

    // const [waterTypes, setWaterTypes] = React.useState([]);
    // const [volumeTypes, setVolumeTypes] = React.useState([]);
  
    const handleFilter = (filter, value) => {
        switch (filter) {
            case "category":
                if (activeWater.includes(value)) {
                    let newWater = activeWater.filter(waterType => waterType !== value)
                    filters.onSelectWater(newWater)
                }
                else {
                    filters.onSelectWater([...activeWater, value])
                }
                break;
            case "volume":
                if(activeVolume.includes(value)) {
                    let newVolume = activeVolume.filter(volumeType => volumeType !== value)
                    filters.onSelectVolume(newVolume)
                }
                else filters.onSelectVolume([...activeVolume, value])
                break;
            default:
                break;
        }
    }
  
    return (
      <div className="categories">
        <div className="container px-0 row align-items-baseline">
            <p className="col-1 px-0" style={{fontWeight: 600}}>Category</p> 
            {categories.waterTypes &&
                categories.waterTypes.map((type, index) => (
                    <ButtonGroup toggle key={`${type}_${index}`} className="water-type-group mr-2">
                        <ToggleButton
                        type="checkbox"
                        variant="outline-primary"
                        checked={activeWater.includes(type)}
                        className = "water-type shadow-none"
                        value={type}
                        onChange={(e) => handleFilter('category', e.currentTarget.value)}
                        >
                        {type}
                        </ToggleButton>
                    </ButtonGroup>
                ))
            }
        </div>

        <div className="container px-0 my-3 row align-items-baseline">
            <p className="col-1 px-0" style={{fontWeight: 600}}>Volume</p> 
                {categories.volumeTypes &&
                    categories.volumeTypes.map(volume => { 
                        return (
                            <ButtonGroup toggle key={volume} className="volume-type-group mr-2">
                            <ToggleButton
                            type="checkbox"
                            variant="outline-primary"
                            checked={activeVolume.includes(volume.toString())}
                            className = "volume-type shadow-none" 
                            value={volume}
                            onChange={(e) => handleFilter('volume', e.currentTarget.value)}
                            >
                            {volume} l
                            </ToggleButton>
                            </ButtonGroup>
                        )
                    })
                }
                
            
        </div>
      </div>
    );
  })

Categories.defaultProps = { 
    activeWater: [],
    activeVolume: [],
    categories: {
        water: [],
        volume: []
    } 
};

  export default Categories;