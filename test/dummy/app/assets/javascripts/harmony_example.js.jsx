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
    var { active, ...other } = { active: true, x: 1, y:2 }
    return (
      <div>
        <h1 {...this.props}>{greeting}</h1>
        <div active={active}>
          <span {...other} />
        </div>
      </div>
      )
  },
});
