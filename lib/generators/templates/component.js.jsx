<%= file_header %>var <%= component_name %> = createReactClass({
<% if attributes.size > 0 -%>
  propTypes: {
<% attributes.each_with_index do |attribute, idx| -%>
    <%= attribute[:name].camelize(:lower) %>: <%= attribute[:type] %><% if (idx < attributes.length-1) %>,<% end %>
<% end -%>
  },
<% end -%>

  render: function() {
    return (
      <React.Fragment>
<% attributes.each do |attribute| -%>
        <%= attribute[:name].titleize %>: {this.props.<%= attribute[:name].camelize(:lower) %>}
<% end -%>
      </React.Fragment>
    );
  }
});
<%= file_footer %>
