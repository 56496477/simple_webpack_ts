import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory({
    basename:'/'
});

function RouterCompontent({ children }) {
    return (
        <Router history={history}>
            {children}
        </Router>
    )
}

export default RouterCompontent;