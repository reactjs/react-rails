<%= file_header %>class <%= component_name %> extends React.Component
<% if attributes.size > 0 -%>
  @propTypes =
<% attributes.each do |attribute| -%>
    <%= attribute[:name].camelize(:lower) %>: <%= attribute[:type] %>
<% end -%>

<% end -%>
  render: ->
    `<React.Fragment>
<% attributes.each do |attribute| -%>
      <%= attribute[:name].titleize %>: {this.props.<%= attribute[:name].camelize(:lower) %>}
<% end -%>
    </React.Fragment>`
<%= file_footer %>
