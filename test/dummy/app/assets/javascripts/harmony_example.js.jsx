var HarmonyComponent = React.createClass({
  statics: {
    generateGreeting() {
      return "Hello Harmony!"
    },
    generateGreetingWithWrapper() {
      var insertedGreeting = this.generateGreeting();
      return `Your greeting is: '${insertedGreeting}'.`
    },
  },
  render: function(){
    var greeting = HarmonyComponent.generateGreeting();
    return (
      <h1 {...this.props}>{greeting}</h1>
      )
  },
});