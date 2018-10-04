import React from 'react';
import SimpleScatterChart from './Components/SimpleScatterChart';
import ThreeDimScatterChart from './Components/ThreeDimScatterChart';
import CardBox from 'components/CardBox';
import ContainerHeader from 'components/ContainerHeader';


const Scatter = ({match}) => {
    return (
        <div className="animated slideInUpTiny animation-duration-3">
            <ContainerHeader title="Scatter Chart" match={match}/>

            <div className="row">
                <CardBox heading="Simple Scatter Chart">
                    <SimpleScatterChart />
                </CardBox>
                <CardBox heading="Three Dim Scatter Chart">
                    <ThreeDimScatterChart />
                </CardBox>
            </div>
        </div>
    );
};

export default Scatter;
