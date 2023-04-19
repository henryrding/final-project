import { Link } from 'react-router-dom';
import ToggleLamberto from '../components/ToggleLamberto';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="Header-content">
      <div className="row">
        <div className="col text-center mb-5">
          <h3>Uh oh, we could not find the page you were looking for!</h3>
          <ToggleLamberto />
          <p className="text-muted" style={{ textDecorationSkipInk: "none" }}>
            <Link to="/">Return to the catalog</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
