import "../style.scss";
import { Container, Grid } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import logo from "../logo.png";

export default function Navbar() {
  function showSearch() {
    const buttons = document.querySelectorAll('.none')
    let i;
    for (i = 0; i < buttons.length; i++){
      buttons[i].classList.remove('none')
    }
  }

  return (
    <div>
      <Container>
        <Grid container className="navbarDiv">
          <Grid item md={1}>
            <img src={logo} alt="" className="logoImg" />
          </Grid>
          <Grid item md={10}></Grid>
          <Grid item md={1} className="iconsDiv">
            <FontAwesomeIcon
              icon={faSearch}
              className="iconsNavbar"
              onClick={showSearch}
            />
            <FontAwesomeIcon
              icon={faShoppingBag}
              className="iconsNavbar"
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
