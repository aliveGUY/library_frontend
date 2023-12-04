import { store } from "../app/store";
import { booksApiSlice } from "../app/api/booksSlice";
import { usersApiSlice } from "../app/api/usersSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch= () => {

    useEffect(() => {
        store.dispatch(booksApiSlice.util.prefetch('getBooks', 'booksList', { force: true }))
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
    }, [])

    return <Outlet />
}

export default Prefetch
