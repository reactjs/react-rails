<%= file_header %>
<% unions = attributes.select{ |a| a[:union] } -%>
<% if unions.size > 0 -%>
<% unions.each do |e| -%>
type <%= e[:name].titleize %> = <%= e[:type]%>
<% end -%>
<% end -%>

interface I<%= component_name %>Props {
<% if attributes.size > 0 -%>
<% attributes.each do | attribute | -%>
<% if attribute[:union] -%>
  <%= attribute[:name].camelize(:lower) %>: <%= attribute[:name].titleize %>;
<% else -%>
  <%= attribute[:name].camelize(:lower) %>: <%= attribute[:type] %>;
<% end -%>
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
