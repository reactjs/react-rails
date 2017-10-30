module React
  module Generators
    class ComponentGenerator < ::Rails::Generators::NamedBase
      source_root File.expand_path '../../templates', __FILE__
      desc <<-DESC.strip_heredoc
      Description:
          Scaffold a React component into `components/` of your Webpacker source or asset pipeline.
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
               :banner => 'field[:type] field[:type] ...'

      class_option :es6,
                   type: :boolean,
                   default: false,
                   desc: 'Output es6 class based component'

      class_option :coffee,
                   type: :boolean,
                   default: false,
                   desc: 'Output coffeescript based component'

      REACT_PROP_TYPES = {
        'node' =>        'PropTypes.node',
        'bool' =>        'PropTypes.bool',
        'boolean' =>     'PropTypes.bool',
        'string' =>      'PropTypes.string',
        'number' =>      'PropTypes.number',
        'object' =>      'PropTypes.object',
        'array' =>       'PropTypes.array',
        'shape' =>       'PropTypes.shape({})',
        'element' =>     'PropTypes.element',
        'func' =>        'PropTypes.func',
        'function' =>    'PropTypes.func',
        'any' =>         'PropTypes.any',

        'instanceOf' => ->(type) {
          'PropTypes.instanceOf(%s)' % type.to_s.camelize
        },

        'oneOf' => ->(*options) {
          enums = options.map{ |k| "'#{k.to_s}'" }.join(',')
          'PropTypes.oneOf([%s])' % enums
        },

        'oneOfType' => ->(*options) {
          types = options.map{ |k| "#{lookup(k.to_s, k.to_s)}" }.join(',')
          'PropTypes.oneOfType([%s])' % types
        }
      }

      def create_component_file
        template_extension = if options[:coffee]
          'js.jsx.coffee'
        elsif options[:es6] || webpacker?
          'es6.jsx'
        else
          'js.jsx'
        end

        # Prefer webpacker to sprockets:
        if webpacker?
          new_file_name = file_name.camelize
          extension = options[:coffee] ? 'coffee' : 'js'
          target_dir = webpack_configuration.source_path
            .join('components')
            .relative_path_from(::Rails.root)
            .to_s
        else
          new_file_name = file_name
          extension = template_extension
          target_dir = 'app/assets/javascripts/components'
        end

        file_path = File.join(target_dir, "#{new_file_name}.#{extension}")
        template("component.#{template_extension}", file_path)
      end

      private

      def webpack_configuration
        Webpacker.respond_to?(:config) ? Webpacker.config : Webpacker::Configuration
      end

      def component_name
        file_name.camelize
      end

      def file_header
        if webpacker?
          %|import React from "react"\nimport PropTypes from "prop-types"\n|
        else
          ''
        end
      end

      def file_footer
        if webpacker?
          %|export default #{component_name}|
        else
          ''
        end
      end

      def webpacker?
        defined?(Webpacker)
      end

       def parse_attributes!
         self.attributes = (attributes || []).map do |attr|
           name = ''
           type = ''
           options = ''
           options_regex = /(?<options>{.*})/

           name, type = attr.split(':')

           if matchdata = options_regex.match(type)
             options = matchdata[:options]
             type = type.gsub(options_regex, '')
           end

           { :name => name, :type => lookup(type, options) }
         end
       end

       def self.lookup(type = 'node', options = '')
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

       def lookup(type = 'node', options = '')
         self.class.lookup(type, options)
       end
    end
  end
end
