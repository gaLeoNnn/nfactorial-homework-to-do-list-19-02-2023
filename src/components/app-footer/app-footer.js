import { LABEL } from "../images/images"
import './app-footer.css';


export default function AppFooter () {
    return(
      <div className="footer">
        <div><img src={LABEL} alt="" /></div>
        <a href="#">Credits: icons from Icons8.</a>
      </div>

    )
}