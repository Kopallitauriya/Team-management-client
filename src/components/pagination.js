import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';

const url = process.env.REACT_APP_API_BASE_URL;

export default function PaginatedView(props) {
    async function paginationHandler(e, page) {
        const domainQuery = props.filter.domain.join(',')
        const availabilityQuery = props.filter.availability.join(',')
        const genderQuery = props.filter.gender.join(',')

        const res = await axios.get(`${url}/user/filter?page=${page}&domain=${domainQuery}&availability=${availabilityQuery}&gender=${genderQuery}`);
        const data = res.data
        props.setUsers(data)
    }
    return (
        <Stack spacing={2}>
            <Pagination
                onChange={paginationHandler}
                count={props.users.total_pages}
                renderItem={(item) => (
                    <PaginationItem
                        slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                        {...item}
                    />
                )}
            />
        </Stack>
    );
}