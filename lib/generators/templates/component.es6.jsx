<%= file_header %>
const <%= component_name %> = (props) => {
  return (
    <React.Fragment>
<% attributes.each do |attribute| -%>
      <%= attribute[:name].titleize %>: {props.<%= attribute[:name].camelize(:lower) %>}
<% end -%>
    </React.Fragment>
  )
}

<% if attributes.size > 0 -%>
<%= file_name.camelize %>.propTypes = {
<% attributes.each_with_index do |attribute, idx| -%>
  <%= attribute[:name].camelize(:lower) %>: <%= attribute[:type] %><% if (idx < attributes.length-1) %>,<% end %>
<% end -%>
};
<% end -%>

<%= file_footer %>
