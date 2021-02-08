import { useSelector } from 'app/store'
import React, { FC } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

// https://medium.com/@thanhbinh.tran93/private-route-public-route-and-restricted-route-with-react-router-d50b27c15f5e
const PrivateRoute: FC<RouteProps> = ({ component: Component, ...rest }) => {
    const { username } = useSelector(state => state.user)
    return (
        <Route
            {...rest}
            render={props =>
                Component && username ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/' />
                )
            }
        />
    )
}

export default PrivateRoute
