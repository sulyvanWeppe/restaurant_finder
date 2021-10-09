import React from 'react';

class App extends React.Component {
   render() {
      return (
         <div>
            <Header/>
            <Content/>
         </div>
      );
   }
}

class Header extends React.Component {
   render() {
      return (
         <h1>Header</h1>
      );
   }
}

class Content extends React.Component{
   render() {
      return (
         <p>This is the content</p>
      );
   }
}

export default App;