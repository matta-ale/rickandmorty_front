import { Link } from "react-router-dom";
import {ROUTES} from '../../Helpers/PathRouters'
import errorImage from '../../img/error404.png'
export default function NotFound() {
  return (
    <div>
        <h1>Oops! You seem to be lost.</h1>
        <img src={errorImage} alt="Error not found 404" />
        <p>Here are some helpful links:</p>
        <Link to={ROUTES.HOME}>Home</Link>
        <Link to={ROUTES.ABOUT}>About</Link>
    </div>
  );
}
