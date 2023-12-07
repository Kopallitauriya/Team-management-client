import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios'
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Checkbox, Typography } from '@mui/material';


export default function CheckButtonsGroup(props) {


    function handleChange(e) {
        if (props.title === 'Domain') {
            let temp = props.filter.domain;
            if (temp.includes(e.target.value)) {
                temp = temp.filter((itm) => itm != e.target.value)
            } else {
                temp.push(e.target.value)
            }
            props.setFilter({
                ...props.filter, domain: temp
            })
        }
        if (props.title === 'Gender') {
            let temp = props.filter.gender;
            if (temp.includes(e.target.value)) {
                temp = temp.filter((itm) => itm != e.target.value)
            } else {
                temp.push(e.target.value)
            }
            props.setFilter({
                ...props.filter, gender: temp
            })

        }
        if (props.title === 'Availability') {
            let temp = props.filter.availability;
            if (temp.includes(e.target.value)) {
                temp = temp.filter((itm) => itm != e.target.value)
            } else {
                temp.push(e.target.value)
            }
            props.setFilter({
                ...props.filter, availability: temp
            })

        }

    }

   


    return (

        <FormControl >
            <FormLabel className='formlabel' id="demo-radio-buttons-group-label" >{props.title}</FormLabel>

            {props.items.map((item, index) => (

                <ul className='lists' key={index} ><FormControlLabel value={item} onChange={handleChange} control={<Checkbox onChange={handleChange} />} label={<Typography style={{ fontSize: "14px" }}>{item}</Typography>} /></ul>
            ))}



        </FormControl>
    );
}