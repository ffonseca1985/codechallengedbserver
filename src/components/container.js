
import React from 'react'
import {Button } from 'reactstrap'
import { openModalBeerAction, closeModalBeerAction, addBeerAction } from './../components/state/actions/containerAction'
import BeerForm from './../components/forms/BeerForm'

import swal from 'sweetalert'
import Beer from '../components/beer'
import { connect } from 'react-redux'

class Container extends React.Component {

    render() {
        const { active, close, beers, name, temperature, addBear, removeContainer, handleSubmit } = this.props
        
        const submit = function(values){

            if(!values.nameBeer)
            {
                swal('Ops', 'choose an beer', 'error')
                return;
            } 

            handleSubmit(name, values)
        }

        return (
            <section> 
                <section>
                       <div> Name Container: {name} </div>
                       <div> Temperature(°C): {temperature} </div>
                </section> 
                <section>
                    <h4>BEERS</h4>
                    {
                        beers.map((beer, index) => 
                        (
                            <Beer key={index} name={beer.name} status={beer.getMessageTemperature()}></Beer>
                        ))
                    }
                </section>
                <section>  
                    <Button color="primary" onClick={addBear}>Add Bear</Button>
                    {/* <Button color="danger" onClick={removeContainer}>Remove Container</Button> */}
                </section>
                <BeerForm active={active} close={close} onSubmit={submit}></BeerForm>
                <hr />
            </section>
        )
    }
}

var mapStateToProp = function(state, props){
 
    return {
        active: state.beerFormReducer.active,
        beers: getContainer(state.truckReducer.containers, props.name)
    }
}

var mapDispatchToAction = function(dispach, state){
    return {
        addBear: function(){
            dispach(openModalBeerAction())
        },
        close: function(){
            dispach(closeModalBeerAction())
        },
        handleSubmit: function(nameContainer, values){
            dispach(addBeerAction(nameContainer, values.nameBeer))
            dispach(closeModalBeerAction())
        }
    }
}

export default connect(mapStateToProp,  mapDispatchToAction)(Container)

function getContainer(containers,  name){
    for (let index = 0; index < containers.length; index++) {
        const element = containers[index];
        if (element.name== name)
            return element.beers
    }
}