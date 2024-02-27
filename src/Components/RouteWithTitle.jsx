import { Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const RouteWithTitle = ({ component: Component, title, ...rest }) => (
    <Route
        {...rest}
        render={(props) => (
            <>
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                <Component {...props} />
            </>
        )}
    />
)

export default RouteWithTitle
