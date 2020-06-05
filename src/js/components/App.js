import React from 'react';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            catteryList: [],
            storageList: [],
            goalCat: null,
            score: 0,
            isBreeding: false,
            targetBreedingSlot: null,
            breedingCats: [{}, {}],
            route: 'home'
        };
    }

    render() {
        return (<>
            {/* <Sidebar>
                <Cattery />
                <Goal />
            </Sidebar>
            <Main>
            </Main> */}
        </>);
    }
}

export default App;