import React from 'react'
import '../../Assests/Styles/filters.css';


const Filters = () => {
    const timeList = ["All","Today","NextWeek","NextMonth"];
    const categoryValues = [
        'Event',
        'Comedy',
        'CollegeEvent',
        'WorkShop',
        'Webinar',
        'theater&art',
      ];


    return (
        <div className='filtersContainer'>
            <div className="filterRow">
                <h3>Time :</h3>
                {
                    timeList.map((time,key)=>{
                        return (
                            <div key={`${time}${key}`} className="filterChips">
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
                            <div key={`${category}${key}`} className="filterChips">
                                <p>{category}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className="filterRow">
                <h3>Sort by :</h3>
                <select name="sortBy" className="filterSortOptions filterChips" defaultValue={"Popularity"}>
                    <option value="Popularity">Popularity</option>
                    <option value="Price">Price</option>
                    <option value="Date">Date</option>
                </select>
            </div>
        </div>
    )
}

export default Filters