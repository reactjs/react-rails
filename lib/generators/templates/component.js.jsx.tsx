<%= file_header %>
interface I<%= component_name %>Props {
<% if attributes.size > 0 -%>
  <% attributes.each_with_index do | attribute, idx | -%>
    <%= attribute[:name].camelize(:lower) %>?: <%= attribute[:type] %>;
  <% end -%>
<% end -%>
}
interface I<%= component_name %>State {
}
class <%= component_name %> extends React.Component <I<%= component_name %>Props, I<%= component_name %>State> {
  render() {
    return (
      <React.Fragment>
        <% attributes.each do |attribute| -%>
          <%= attribute[:name].titleize %>: {this.props.<%= attribute[:name].camelize(:lower) %>}
        <% end -%>
      </React.Fragment>
    );
  }
}

<%= file_footer %>
