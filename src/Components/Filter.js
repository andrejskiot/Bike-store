import React from 'react';
import { Grid } from "@material-ui/core";
import array from './ButtonsArray'
import Axios from 'axios';



class Filters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            all: [],
            female: '',
            male: '',
            leGrand: '',
            kross: '',
            explorer: '',
            visitor: '',
            pony: '',
            force: '',
            ebike: '',
            ideal: '',
        }
    }

    componentDidMount() {
        Axios('https://json-project3.herokuapp.com/products')
            .then(data => {
                this.setState({
                    all: data.data,
                    female: data.data.filter(element => element.gender === 'FEMALE'),
                    male: data.data.filter(element => element.gender === 'MALE'),
                    leGrand: data.data.filter(element => element.brand === 'LE GRAND BIKES'),
                    kross: data.data.filter(element => element.brand === 'KROSS'),
                    explorer: data.data.filter(element => element.brand === 'EXPLORER'),
                    visitor: data.data.filter(element => element.brand === 'VISITOR'),
                    pony: data.data.filter(element => element.brand === 'PONY'),
                    force: data.data.filter(element => element.brand === 'FORCE'),
                    ebike: data.data.filter(element => element.brand === 'E-BIKES'),
                    ideal: data.data.filter(element => element.brand === 'IDEAL'),
                })
            })
    }


    render() {

        const btnArray = array

        return (
            
                <Grid item md={3} className='left-filters'>
                    <Grid item md={12}>
                        <p className='filterBy'>Filter by: </p>
                    </Grid>
                    <Grid container>
                        <Grid item md={10} className='active'>
                            <p onClick={(e) => this.props.onFilterClick(e.currentTarget.id)} id='Show all' className='filter-hover'>Show All</p>
                        </Grid>
                        <Grid item md={2}>
                            <p>{this.state.all.length}</p>
                        </Grid>
                    </Grid>
                    <Grid item md={12}>
                        <p className='gender-brand'>Gender </p>
                    </Grid>
                    <Grid container>
                        <Grid item md={10}>
                            <p onClick={(e) => this.props.onFilterClick(e.currentTarget.id)} id='male' className='filter-hover'>Male</p>
                        </Grid>
                        <Grid item md={2}>
                            <p>{this.state.male.length}</p>
                        </Grid>
                        <Grid item md={10}>
                            <p onClick={(e) => this.props.onFilterClick(e.currentTarget.id)} id='female' className='filter-hover'>Female</p>
                        </Grid>
                        <Grid item md={2}>
                            <p>{this.state.female.length}</p>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item md={12}>
                            <p className='gender-brand'>Brand</p>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item md={10}>
                            {btnArray.map((btn) => {
                                return (
                                    <p id={btn.id} className='filter-hover' onClick={(e) => this.props.onFilterClick(e.currentTarget.id)}>{btn.type}</p>
                                )
                            })}
                        </Grid>
                        <Grid item md={2}>
                            {btnArray.map((btn) => {
                                return (
                                    <p>{btn.ammount}</p>
                                )
                                
                            })}
                            
                        </Grid>
                    </Grid>
                </Grid>







        )
    }

}

export default Filters

