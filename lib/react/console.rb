module React
  class Console
    def self.polyfill_js
      # Overwrite global `console` object with something that can capture messages
      # to return to client later for debugging
      <<-JS
      var console = { history: [] };
      ['error', 'log', 'info', 'warn'].forEach(function (fn) {
        console[fn] = function () {
          console.history.push({level: fn, arguments: Array.prototype.slice.call(arguments)});
        };
      });
      JS
    end

    def self.replay_as_script_js
      <<-JS
      (function (history) {
        if (history && history.length > 0) {
          result += '\\n<scr'+'ipt>';
          history.forEach(function (msg) {
            result += '\\nconsole.' + msg.level + '.apply(console, ' + JSON.stringify(msg.arguments) + ');';
          });
          result += '\\n</scr'+'ipt>';
        }
      })(console.history);
      JS
    end
  end
end
