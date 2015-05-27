var <%= file_name.camelize %> = React.createClass({
<% if attributes.size > 0 -%>
  propTypes: {
<% attributes.each_with_index do |attribute, idx| -%>
    <%= attribute[:name].camelize(:lower) %>: <%= attribute[:type] %><% if (idx < attributes.length-1) %>,<% end %>
<% end -%>
  },
<% end -%>

  render: function() {
<% if attributes.size > 0 -%>
    return (
      <div>
<% attributes.each do |attribute| -%>
        <div><%= attribute[:name].titleize %>: {this.props.<%= attribute[:name].camelize(:lower) %>}</div>
<% end -%>
      </div>
    );
<% else -%>
    return <div />;
<% end -%>
  }
});
