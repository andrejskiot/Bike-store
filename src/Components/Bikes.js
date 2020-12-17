import React from "react";
import axios from "axios";
import { Container, Grid } from "@material-ui/core";
import Filters from "./Filter";
import Fade from "react-reveal/Fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

class Bikes extends React.Component {
  constructor() {
    super();
    this.state = {
      bikes: [],
      filteredBikes: [],
      searchInput: "",
      bike: '',
    };
  }

  componentDidMount() {
    axios("https://json-project3.herokuapp.com/products").then((data) => {
      this.setState({
        bikes: data.data,
        filteredBikes: data.data,
        searchInput: "",
      });
    });
  }

  filter = (changeBikes) => {
    document.querySelector(".active").classList.remove("active");
    document.getElementById(changeBikes).classList.add("active");
    const upperBikes = changeBikes.toUpperCase();
    this.setState({
      filteredBikes: this.state.bikes.filter((bike) => {
        if (
          upperBikes === bike.brand.toUpperCase() ||
          upperBikes === bike.gender.toUpperCase() ||
          upperBikes === "SHOW ALL"
        ) {
          return true;
        } else {
          return false;
        }
      }),
    });
  };
  handleChange = (e) => {
    this.setState({
      searchInput: e.target.value,
    });
  };
  findBikes = (e) => {
    const bikeValue = this.state.searchInput.toUpperCase();
    this.setState({
      filteredBikes: this.state.bikes.filter((el) => {
        if (el.name.includes(bikeValue)) {
          return true;
        } else {
          return false;
        }
      }),
    });
  };
  sortByPrice = (e) => {
    this.setState({
      filteredBikes: this.state.filteredBikes.sort(
        ({ price: a }, { price: b }) => {
          if (e.target.value === "low") {
            return a - b;
          } else if (e.target.value === "high") {
            return b - a;
          }
        }
      ),
    });
  };
  render() {
    return (
      <Container className={"container-top"}>
        <Grid container spacing={4}>
          <Grid container className="actionButtonDiv">
            <Grid item md={6}></Grid>
            <Grid item md={2}>
              <Fade left>
                <input
                  type="text"
                  className="search-input none"
                  onChange={this.handleChange}
                  placeholder='Search for a bike'
                ></input>
              </Fade>
            </Grid>
            <Grid item md={1}>
              <Fade left>
                <button
                  type="submit"
                  className="submit-btn none"
                  onClick={this.findBikes}
                >
                  Search
                </button>
              </Fade>
            </Grid>

            <Grid item md={3} className='sort-price'>
              <Fade top>
                <div className='inner-select-div  none'>
                  <span>Sort by price:</span>
                  <select onChange={this.sortByPrice} name='bikes' id='bikes'>
                    <option value='high'>High to low</option>
                    <option value='low'>Low to High</option>
                  </select>
                </div>
              </Fade>
            </Grid>

          </Grid>

          <Filters onFilterClick={this.filter} />
          <Grid item md={9}>
            <Grid container spacing={5}>
              {this.state.filteredBikes.map((bike, index) => {
                return (

                  <Grid item md={4} key={index}>
                    <Fade big>
                      <div className="grid-card-div">
                        <div className="card-img-div">
                          <img
                            src={
                              require(`../../src/assets/${bike.image}.png`)
                                .default
                            }
                            alt="bike-images"
                          ></img>
                        </div>
                        <div className="card-body-div">
                          <p className="card-title">{bike.name}</p>
                          <FontAwesomeIcon
                            icon={faDollarSign}
                          /> <span>{bike.price}</span>
                        </div>
                      </div>
                    </Fade>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default Bikes;
