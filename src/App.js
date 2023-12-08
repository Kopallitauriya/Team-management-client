
import './App.css';
import SearchAppBar from './components/navbar.js'
import CheckButtonsGroup from './components/filterbutton.js'
import Card from './components/card.js'
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import PaginatedView from './components/pagination.js';

const url = 'http://localhost:8000'

function App() {
  const [filter, setFilter] = useState({ domain: [], gender: [], availability: [] });
  const [domain, setDomain] = useState([])
  const [users, setUsers] = useState({})
  const [teamID,setTeamID]= useState([])


  async function filterHandler(){
    const domainQuery = filter.domain.join(',')
    const availabilityQuery = filter.availability.join(',')
    const genderQuery = filter.gender.join(',')
    // setIsLoading(true)
    const res = await axios.get(`${url}/?page=1&domain=${domainQuery}&availability=${availabilityQuery}&gender=${genderQuery}`)
    // setIsLoading(false)
    const userData=res.data
    setUsers(userData)
    console.log(userData)

  }
  async function clickHandler(e){
    e.preventDefault()
    const id=e.target.id
    if(teamID.includes(id)){
      const temp = teamID.filter((itm)=>itm!=id)
      setTeamID(temp)
      e.target.className = e.target.className.split('selected').join('');
    }
    else{
      setTeamID([...teamID,id])
      console.log(e.target.classList)
      e.target.className += (" selected");
    }

  }

  useEffect(() => {
    async function getAllDomains() {
      let res = await axios.get(`${url}/domain`)
      const domainData = res.data
      setDomain(domainData)

      res = await axios.get(`${url}/?page=1`)
      const cardData = res.data
      setUsers(cardData)
      console.log(cardData)

    }
    getAllDomains()

  }, [])





  return (
    <>
      <div className='container'>
        <div className='inner-container'>
          <div className='navbar'><SearchAppBar filter={filter} setFilter={setFilter} setUsers={setUsers}/></div>

          <div className='field'>
            <div className='sidebar'>
              <div className='filter-fields'>
                <CheckButtonsGroup title={'Domain'} items={domain} filter={filter} setFilter={setFilter} />
              </div>
              <div className='filter-fields'>
                <CheckButtonsGroup title={'Gender'} items={['Female', 'Male', 'Other']} filter={filter} setFilter={setFilter} />
              </div>
              <div className='filter-fields'>
                <CheckButtonsGroup title={'Availability'} items={['False', 'True']} filter={filter} setFilter={setFilter} />
              </div>

              <Button variant="contained" onClick={filterHandler}>apply</Button>
            </div>

            <div className='cardfield'>
              {users?.data?.map((itm) => {
                return <button className="card"  onClick={clickHandler}><Card item={itm} /></button>
              })}
            </div>

          </div>
          <div className='paginatedview'><PaginatedView filter={filter} users ={users} setUsers={setUsers} /></div>

        </div>

      </div>
    </>
  );
}

export default App;



