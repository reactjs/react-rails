class @<%= file_name.camelize %> extends React.Component
<% if attributes.size > 0 -%>
  @propTypes =
<% attributes.each do |attribute| -%>
    <%= attribute[:name].camelize(:lower) %>: <%= attribute[:type] %>
<% end -%>

<% end -%>
  render: ->
<% if attributes.size > 0 -%>
    `<div>
<% attributes.each do |attribute| -%>
      <div><%= attribute[:name].titleize %>: {this.props.<%= attribute[:name].camelize(:lower) %>}</div>
<% end -%>
    </div>`
<% else -%>
    `<div />`
<% end -%>