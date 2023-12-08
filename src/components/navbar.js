import * as React from 'react';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { Button } from '@mui/material';

const url = 'http://localhost:8000/api'



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar(props) {
  const [search, setSearch] = useState('');

  async function handlerSearch(e) {
    const domainQuery = props.filter.domain.join(',')
    const availabilityQuery = props.filter.availability.join(',')
    const genderQuery = props.filter.gender.join(',')

    setSearch(e.target.value)
    console.log(search)
    const res = await axios.get(`${url}/user/filter?page=1&domain=${domainQuery}&availability=${availabilityQuery}&gender=${genderQuery}&search=${e.target.value}`)
    const searchdata = res.data
    props.setUsers(searchdata)
  }

  async function showTeamHandler() {
    props.setShowTeams(!props.showTeams)
  }

  async function createTeamHandler() {
    if(props.showTeams) {
      props.setShowTeams(false);
      return;
    }
    const res = await axios.post(`${url}/team`, { teamID: props.teamID })
    const data = res.data;
    if(data.success==false) alert(data.message)
    else props.setShowTeams(true);
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Heliverse
          </Typography>

          <Button
            onClick={createTeamHandler}
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Create Team
          </Button>
          <Button
            onClick={showTeamHandler}
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Show Teams
          </Button>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={handlerSearch}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}