import React from "react";

// //functional component
// const About = () => {
//   return React.createElement(
//     "h1",
//     null,
//     "i am generating this with createelement"
//   );
// };

class About extends React.Component {
  render() {
    return <h1>Hellooo i am class component</h1>;
  }
}

export default About;
