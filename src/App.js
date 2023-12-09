
import './App.css';
import SearchAppBar from './components/navbar.js'
import CheckButtonsGroup from './components/filterbutton.js'
import Card from './components/card.js'
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import PaginatedView from './components/pagination.js';
import Team from './components/team.js';

const url = process.env.REACT_APP_API_URL;

function App() {
  const [filter, setFilter] = useState({ domain: [], gender: [], availability: [] });
  const [domain, setDomain] = useState([])
  const [users, setUsers] = useState({})
  const [teamID, setTeamID] = useState([])
  const [showTeams, setShowTeams] = useState(false)

  async function filterHandler() {
    const domainQuery = filter.domain.join(',')
    const availabilityQuery = filter.availability.join(',')
    const genderQuery = filter.gender.join(',')

    // remove all selected cards
    setTeamID([]);
    const elements = document.querySelectorAll('.selected');
    elements.forEach(e => {
      e.className = e.className.split('selected').join('');
    });

    const res = await axios.get(`${url}/user/filter?page=1&domain=${domainQuery}&availability=${availabilityQuery}&gender=${genderQuery}`)
    const userData = res.data
    console.log(userData)
    setUsers(userData)
    console.log(userData)

  }
  async function clickHandler(e) {
    e.preventDefault()
    const id = e.target.id
    if (teamID.includes(id)) {
      const temp = teamID.filter((itm) => itm != id)
      setTeamID(temp)
      e.target.className = e.target.className.split('selected').join('');
    }
    else {
      setTeamID([...teamID, id])
      console.log(e.target.classList)
      e.target.className += (" selected");
    }

  }

  useEffect(() => {
    async function getAllDomains() {
      let res = await axios.get(`${url}/user/domain`)
      const domainData = res.data
      setDomain(domainData)

      res = await axios.get(`${url}/user/filter?page=1`)
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
          <div className='navbar'><SearchAppBar sx={{ width: "100%" }} filter={filter} setFilter={setFilter} setUsers={setUsers} teamID={teamID} setShowTeams={setShowTeams} showTeams={showTeams} /></div>
          {showTeams ? <Team /> : <>
            {/* <div className='responsive-button'>
              <button id='navbar-button'>create team</button>
              <button id='navbar-button'>show teams</button>
            </div> */}

            <div className='field'>
              <div className='sidebar'>
                <div className='filter-fields'>
                  <CheckButtonsGroup title={'Domain'} items={domain} filter={filter} setFilter={setFilter} />
                </div>
                <div className='filter-fields'>
                  <CheckButtonsGroup title={'Gender'} items={['Female', 'Male', 'Other']} filter={filter} setFilter={setFilter} />
                </div>
                <div className='filter-box'>
                  <div className='filter-fields'>
                    <CheckButtonsGroup title={'Availability'} items={['false', 'true']} filter={filter} setFilter={setFilter} />
                  </div>
                    <Button style={{width:"20px"}} variant="contained" onClick={filterHandler}>apply</Button>
                </div>

              </div>



              <div className='cardfield'>
                {users?.data?.map((itm, indx) => {
                  return <button className="card" onClick={clickHandler} key={indx + 1}><Card item={itm} /></button>
                })}
              </div>

            </div>
            <div className='paginatedview'><PaginatedView filter={filter} users={users} setUsers={setUsers} /></div>
          </>

          }

        </div>

      </div>
    </>
  );
}

export default App;



