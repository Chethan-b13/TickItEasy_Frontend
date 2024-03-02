import React from 'react'
import '../../Assests/Styles/filters.css';


const Filters = ({filters, setfilters}) => {
    const timeList = ["Today","Tomorrow","NextWeek","NextMonth"];
    const categoryValues = [
        'Event',
        'Comedy',
        'CollegeEvent',
        'WorkShop',
        'Webinar',
        'theater&art',
    ];

    const handleFilterChange = (key,value)=> {
        if(!filters?.[key]?.includes(value)){
            setfilters((prev)=>{
                return {...prev, [key]: [...prev?.[key],value] }
            })
        }else{
            setfilters((prev)=>{
                return {...prev, [key]: prev?.[key].filter((x)=> x !== value ) }
            })
        }
    }


    return (
        <div className='filtersContainer'>
            <div className="filterRow">
                <h3>Time :</h3>
                {
                    timeList.map((time,key)=>{
                        return (
                            <div key={`${time}${key}`} className={`filterChips ${filters?.time === time && "selectedFilter"}`}
                                onClick={()=>{
                                    if(filters?.time !== time){
                                        setfilters((prev)=>{
                                            return {...prev, time: time }
                                        })
                                    }else{
                                        setfilters((prev)=>{
                                            return {...prev, time: "" }
                                        })
                                    }
                                }}
                            >
                                <p>{time}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className="filterRow">
                <h3>Category :</h3>
                {
                    categoryValues.map((category,key)=>{
                        return (
                            <div key={`${category}${key}`} className={`filterChips ${filters?.category?.includes(category) && "selectedFilter"}`}
                                onClick={()=>{handleFilterChange("category",category)}}
                            >
                                <p>{category}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className="filterRow">
                <h3>Sort by :</h3>
                <select name="sortBy" className="filterSortOptions filterChips" defaultValue={filters?.sortby}
                onChange={(e)=>{
                    setfilters((prev)=>{
                        return {...prev, sortby: e.target.value }
                    })
                }}
                >
                    <option value="popularity">Popularity</option>
                    <option value="price">Price</option>
                    <option value="date">Date</option>
                    <option value="free">Free</option>
                </select>
            </div>
        </div>
    )
}

export default Filters