import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import LaunchItem from './LaunchItem';
import { RingLoader } from 'react-spinners';
import { Query } from '@apollo/react-components';

const LAUNCHES_QUERY = gql`
    query LaunchesQuery {
        launches {
            flight_number
            mission_name
            launch_date_local
            launch_success
        }
    }
`;


class Launches extends Component {
  render() {
    return (
        <div>
            <h1 className="display-4 my-3">Launches</h1>
            <Query query={LAUNCHES_QUERY}>
                {
                    ({loading, error, data})=>{
                        if(loading){return   <RingLoader
                            sizeUnit={"px"}
                            size={100}
                            color={'#FFFFFF'}
                            loading={true}
                          />}
                        if(error){console.log(error)}
                        console.log(data)
                        return <Fragment>
                            {
                                data.launches.map(launch => (
                                    <LaunchItem key={launch.flight_number} launch={launch}/>
                                ))
                            }
                        </Fragment>
                    }
                }
            </Query>
        </div>
    );
  }
}

export default Launches
