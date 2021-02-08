import React, { FC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from 'components/routes/login'
import Cars from 'components/routes/cars'
import NavBar from 'components/common/NavBar'
import DialogController from 'components/common/DialogController'
import Notification from 'components/common/Notification'
import PrivateRoute from 'components/common/PrivateRoute'

const Unknown: FC = () => {
    return <div>404 Ooops something is wrong</div>
}

const App = () => {
    return (
        <>
            <div>
                <BrowserRouter>
                    <NavBar />
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <PrivateRoute exact path='/cars' component={Cars} />
                        <Route path='*' component={Unknown} />
                    </Switch>
                    <DialogController />
                    <Notification />
                </BrowserRouter>
            </div>
        </>
    )
}

export default App
