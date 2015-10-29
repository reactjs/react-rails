module React
  module Generators
    class ComponentGenerator < ::Rails::Generators::NamedBase
      source_root File.expand_path '../../templates', __FILE__
      desc <<-DESC.strip_heredoc
      Description:
          Scaffold a react component into app/assets/javascripts/components.
          The generated component will include a basic render function and a PropTypes
          hash to help with development.

      Available field types:

          Basic prop types do not take any additional arguments. If you do not specify
          a prop type, the generic node will be used. The basic types available are:

          any
          array
          bool
          element
          func
          number
          object
          node
          shape
          string

          Special PropTypes take additional arguments in {}, and must be enclosed in
          single quotes to keep bash from expanding the arguments in {}.

          instanceOf
          takes an optional class name in the form of {className}

          oneOf
          behaves like an enum, and takes an optional list of strings that will
          be allowed in the form of 'name:oneOf{one,two,three}'.

          oneOfType.
          oneOfType takes an optional list of react and custom types in the form of
          'model:oneOfType{string,number,OtherType}'

      Examples:
          rails g react:component person name
          rails g react:component restaurant name:string rating:number owner:instanceOf{Person}
          rails g react:component food 'kind:oneOf{meat,cheese,vegetable}'
          rails g react:component events 'location:oneOfType{string,Restaurant}'
      DESC

      argument :attributes,
               :type => :array,
               :default => [],
               :banner => "field[:type] field[:type] ..."

      class_option :es6,
                   type: :boolean,
                   default: false,
                   desc: 'Output es6 class based component'

      class_option :coffee,
                   type: :boolean,
                   default: false,
                   desc: 'Output coffeescript based component'

      REACT_PROP_TYPES = {
        "node" =>        'React.PropTypes.node',
        "bool" =>        'React.PropTypes.bool',
        "boolean" =>     'React.PropTypes.bool',
        "string" =>      'React.PropTypes.string',
        "number" =>      'React.PropTypes.number',
        "object" =>      'React.PropTypes.object',
        "array" =>       'React.PropTypes.array',
        "shape" =>       'React.PropTypes.shape({})',
        "element" =>     'React.PropTypes.element',
        "func" =>        'React.PropTypes.func',
        "function" =>    'React.PropTypes.func',
        "any" =>         'React.PropTypes.any',

        "instanceOf" => ->(type) {
          'React.PropTypes.instanceOf(%s)' % type.to_s.camelize
        },

        "oneOf" => ->(*options) {
          enums = options.map{|k| "'#{k.to_s}'"}.join(',')
          'React.PropTypes.oneOf([%s])' % enums
        },

        "oneOfType" => ->(*options) {
          types = options.map{|k| "#{lookup(k.to_s, k.to_s)}" }.join(',')
          'React.PropTypes.oneOfType([%s])' % types
        },
      }

      def create_component_file
        extension = case
                      when options[:es6]
                        'es6.jsx'
                      when options[:coffee]
                        'js.jsx.coffee'
                      else
                        'js.jsx'
                    end

        file_path = File.join('app/assets/javascripts/components', "#{file_name}.#{extension}")
        template("component.#{extension}", file_path)
      end

      private

       def parse_attributes!
         self.attributes = (attributes || []).map do |attr|
           name, type, options = "", "", ""
           options_regex = /(?<options>{.*})/

           name, type = attr.split(':')

           if matchdata = options_regex.match(type)
             options = matchdata[:options]
             type = type.gsub(options_regex, '')
           end

           { :name => name, :type => lookup(type, options) }
         end
       end

       def self.lookup(type = "node", options = "")
         react_prop_type = REACT_PROP_TYPES[type]
         if react_prop_type.blank?
           if type =~ /^[[:upper:]]/
             react_prop_type = REACT_PROP_TYPES['instanceOf']
           else
             react_prop_type = REACT_PROP_TYPES['node']
           end
         end

         options = options.to_s.gsub(/[{}]/, '').split(',')

         react_prop_type = react_prop_type.call(*options) if react_prop_type.respond_to? :call
         react_prop_type
       end

       def lookup(type = "node", options = "")
         self.class.lookup(type, options)
       end
    end
  end
end
