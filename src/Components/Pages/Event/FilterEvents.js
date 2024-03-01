import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../Common/Navbar'
import { MdOutlineEventAvailable } from 'react-icons/md'
import Filters from '../../Common/Filters'
import { HomeData } from '../Home'
import { Card } from './TopEvents'
import { FetchAllEvents } from './EventApis'
import { useDispatch } from 'react-redux'
import LoadingScreen from '../../Common/LoadingScreen'
import { useLocation } from 'react-router-dom'

const FilterEvents = () => {

    const [events, setevents] = useState([]);
    const [loading, setloading] = useState(false)
    const [FilteredEvents, setFilteredEvents] = useState(null);
    const [filters, setfilters] = useState({
        time: "",
        category: [],
        sortby: "popularity"
    })
    const dispatch = useDispatch()

    const fetchData = async ()=> {
        setloading(true)
        const allEvents = await FetchAllEvents(dispatch,setevents);
        // const tempFilters = allEvents?.sort((a,b)=> ((b.tickets_booked/b.number_of_seats)-(a.tickets_booked/a.number_of_seats)))
        
        setFilteredEvents(allEvents)
        setloading(false)
    }

    useEffect( () => {
        fetchData()
    }, [])


    useEffect(() => {
        // const search = window.location.search;
        // const queryParams = new URLSearchParams(search);
        // const timeParam = queryParams.get('time') || "";
        // const sortbyParam = queryParams.get('sortby') || 'popularity';
        // setfilters({
        //     time: timeParam,
        //     category: [],
        //     sortby: sortbyParam
        // });

        const applyCategoryFilter = (events) => {
          return filters?.category?.length > 0
            ? events.filter((event) => filters.category.includes(event.genre))
            : events;
        };

        const applyTimeFilter = (events) => {
            const currentDate = new Date();

            switch (filters.time?.toLowerCase()) {
                case "today":
                    return events?.filter((event) => new Date(event.start_time).getDate() === currentDate.getDate());
        
                case "tomorrow":
                    const tomorrowDate = new Date(currentDate);
                    tomorrowDate.setDate(currentDate.getDate() + 1);
                    return events?.filter((event) => new Date(event.start_time).getDate() === tomorrowDate.getDate());
        
                case "nextweek":
                    const nextWeekDate = new Date(currentDate);
                    nextWeekDate.setDate(currentDate.getDate() + 7);
                    return events?.filter((event) => new Date(event.start_time) <= nextWeekDate);
        
                case "nextmonth":
                    const nextMonthDate = new Date(currentDate);
                    nextMonthDate.setMonth(currentDate.getMonth() + 1);
                    return events?.filter((event) => (new Date(event.start_time) <= nextMonthDate) && new Date(event.start_time) >= currentDate) ;
        
                default:
                    return events;
            }
        }
      
        const applySort = (events) => {
          switch (filters.sortby) {
            case "price":
              return events.sort((a, b) => b.price - a.price);
            case "date":
              return events.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
            case "free":
              return events.filter((event) => event.price === 0 );
            default:
              return events.sort((a, b) => (b.tickets_booked / b.number_of_seats) - (a.tickets_booked / a.number_of_seats));
          }
        };
      
        const filteredEvents = applySort(applyCategoryFilter(applyTimeFilter([...events])));
        setFilteredEvents(filteredEvents);
      }, [filters, events]);
    
    
    return (
        <div className='Container'>
            <Navbar />
            <h1><MdOutlineEventAvailable/>All Events</h1>
            <Filters filters={filters} setfilters={setfilters} />
            {
                loading && <LoadingScreen />
            }
            <div className="column3">
            {   FilteredEvents &&
                FilteredEvents?.map((event,indx)=>{
                return (
                    <div key={indx} style={{height:'auto'}} className="col">
                        <Card event={event}/>
                    </div>
                )
                })
            }
            </div>
        </div>
    )
}

export default FilterEvents