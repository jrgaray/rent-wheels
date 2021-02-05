import React, { FC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from 'components/routes/login'
import Cars from 'components/routes/cars'
import NavBar from 'components/common/NavBar'

const What: FC = () => {
    return <div>huh</div>
}

function App() {
    return (
        <>
            <NavBar />
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <Route exact path='/cars' component={Cars} />
                        <Route path='*' component={What} />
                    </Switch>
                </BrowserRouter>
            </div>
        </>
    )
}

export default App
