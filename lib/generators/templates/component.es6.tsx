<%= file_header %>
interface I<%= component_name %>Props {
  <% if attributes.size > 0 -%>
  <% attributes.each do |attribute| -%>
  <% if attribute[:union] -%>
  <%= attribute[:name].camelize(:lower) %>: <%= attribute[:name].titleize %>;
  <% else -%>
  <%= attribute[:name].camelize(:lower) %>: <%= attribute[:type] %>;
  <% end -%>
  <% end -%>
  <% end -%>
}

const <%= component_name %> = (props: I<%= component_name %>Props) => {
  return (
    <React.Fragment>
      <% attributes.each do |attribute| -%>
      <%= attribute[:name].titleize %>: {props.<%= attribute[:name].camelize(:lower) %>}
      <% end -%>
    </React.Fragment>
  )
}

<%= file_footer %>
