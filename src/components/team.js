import React, { useEffect, useState } from 'react'
import Card from './card.js'
import { Button, CircularProgress } from '@mui/material';
import axios from 'axios';

const url = 'http://localhost:8000/api'



const Team = (props) => {

  const [fetchTeams, setFetchTeams] = useState([])
  const [showMembers, setShowMembers] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {

    async function getAllTeams() {
      const res = await axios.get(`${url}/team`)
      setFetchTeams(res.data)
      setShowMembers(res.data[0])
    }
    getAllTeams()

  }, [isLoading])

  async function teamSelectHandler(e) {
    e.preventDefault()
    let data = fetchTeams.filter((itm) => itm._id === e.target.id)
    setShowMembers(data[0])

  }

  async function deleteHandler(e) {
    setIsLoading(true);
    const res = await axios.delete(`${url}/team/${showMembers?._id}`)
    setIsLoading(false);
  }



  return (

    <>
      {isLoading ? <CircularProgress /> : <>
        {fetchTeams.length < 1 ? <div style={{ display: 'flex', alignItems: "center", justifyContent: "center", height: "80vh" }}><p>No teams availiable. Create One!</p></div> : <>
          <Button sx={{ color: 'red' }} onClick={deleteHandler} type='delete'>Delete Team</Button>
          <div className='field'>
            <div className='sidebar'>
              {
                fetchTeams.map((itm) => {
                  return <Button variant='text' style={{ boxShadow: " 2px 2px 2px 0 grey" }} sx={{ mb: 5 }} id={itm._id} onClick={teamSelectHandler}>Team: {itm._id}:</Button>

                })}
            </div>

            <div className='cardfield' style={{ marginLeft: "4rem" }}>
              {showMembers?.userID?.map((itm) => {
                return <button className="card"><Card item={itm} /></button>
              })}
            </div>

          </div>
        </>
        }
      </>
      }
    </>
  )
}

export default Team
