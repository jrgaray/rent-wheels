import React, { FC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from 'components/Login'
import Cars from 'components/Cars'
import NavBar from 'components/common/NavBar'
import DialogController from 'components/common/DialogController'
import Notification from 'components/common/Notification'
import PrivateRoute from 'components/common/PrivateRoute'

const Unknown: FC = () => <div>404? Idk something is wrong</div>

const App: FC = () => {
    return (
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
    )
}

export default App
