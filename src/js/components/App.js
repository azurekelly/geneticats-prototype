import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import GoalHeader from './GoalHeader';
import CatList from './CatList';
import BigButton from './BigButton';
import {changeRoute} from '../redux/modules/route';

// class App extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             catteryList: [],
//             storageList: [],
//             goalCat: null,
//             score: 0,
//             isBreeding: false,
//             targetBreedingSlot: null,
//             breedingCats: [{}, {}],
//             route: 'home'
//         };
//     }

//     render() {
//         return (<>
//             {/* <Sidebar>
//                 <Cattery />
//                 <Goal />
//             </Sidebar>
//             <Main>
//             </Main> */}
//         </>);
//     }
// }

const App = () => {
    const route = useSelector(state => state.route);
    const catteryCats = useSelector(state => state.catStore.cattery);
    const dispatch = useDispatch();

    return (
        <>
            <div id='cattery-header' className='header'><span>YOUR CATS</span></div>
            <div id='cattery'>
                <CatList cats={catteryCats} />
            </div>
            <div id='goal-header' className='header'>
                <GoalHeader score={0} />
            </div>
            <div id='goal'>
            </div>
            <div id='main'>
                {route === 'home' && (
                    <div id='home-screen'>
                        <BigButton onClick={() => dispatch(changeRoute('breed'))}>Breed</BigButton>
                        <BigButton onClick={() => dispatch(changeRoute('adopt'))}>Adopt</BigButton>
                        <BigButton onClick={() => dispatch(changeRoute('storage'))}>Storage</BigButton>
                    </div>
                )}
            </div>
        </>
    );
};

export default App;