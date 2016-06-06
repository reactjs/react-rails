module React
  module Generators
    module ComponentTypes
      BASE = 'React.PropTypes'.freeze

      %w(node bool string number object array element func any).each do |type|
        define_method(type) do
          "#{ComponentTypes::BASE}.#{type}"
        end
      end

      def boolean
        "#{ComponentTypes::BASE}.bool"
      end

      def function
        "#{ComponentTypes::BASE}.func"
      end

      def shape
        "#{ComponentTypes::BASE}.shape({})"
      end

      def instanceOf
        ->(type) do
          format("#{ComponentTypes::BASE}.instanceOf(%s)", type.to_s.camelize)
        end
      end

      def oneOf
        ->(*options) do
          format(
            "#{ComponentTypes::BASE}.oneOf([%s])",
            options.map { |k| "'#{k}'" }.join(',')
          )
        end
      end

      def oneOfType
        ->(*options) do
          format(
            "#{ComponentTypes::BASE}.oneOfType([%s])",
            options.map { |k| "#{lookup(k.to_s, k.to_s)}" }.join(',')
          )
        end
      end
    end

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

      extend ComponentTypes

      argument :attributes, type: :array, default: [],
                            banner: 'field[:type] field[:type] ...'

      class_option :es6, type: :boolean, default: false,
                         desc: 'Output es6 class based component'

      class_option :coffee, type: :boolean, default: false,
                            desc: 'Output coffeescript based component'

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
           options_regex = /(?<options>{.*})/

           name, type = attr.split(':')

           matchdata = options_regex.match(type)
           options = if matchdata
                       type = type.gsub(options_regex, '')
                       matchdata[:options]
                     else
                       ''
                     end
           { name: name, type: lookup(type, options) }
         end
       end

       def self.lookup(type = 'node', options = '')
         react_prop_type = type && respond_to?(type) ? send(type) : ''
         if react_prop_type.blank?
           if type =~ /^[[:upper:]]/
             react_prop_type = send('instanceOf')
           else
             react_prop_type = send('node')
           end
         end

         options = options.to_s.gsub(/[{}]/, '').split(',')

         react_prop_type = react_prop_type.call(*options) if react_prop_type.respond_to? :call
         react_prop_type
       end

       def lookup(type = 'node', options = '')
         self.class.lookup(type, options)
       end
    end
  end
end
