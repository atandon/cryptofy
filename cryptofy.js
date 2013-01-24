(function($){ 
   $.fn.cryptofy = function(options) {
      var self      = this;
      var time      = (typeof option !== 'undefined' && options.hasOwnProperty('time')) ? options.time : 5000;
      var interval  = (typeof option !== 'undefined' && options.hasOwnProperty('interval')) ? options.interval : 100;
      var orig_str  = $(self).html().toString();
      var letters   = "abcdefghijklmnopqrstuvwxyz";
      var numbers   = "0123456789";

      function replaceAt(str,index,char) {
        return str.substr(0, index) + char + str.substr(index+char.length);
      };

      function shuffle(o) {
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
      };

      function shuffleStr(o) {
        var a = o.split("");
            n = a.length;

        for(var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
        return a.join("");
      };

      var numberArray = [];
      for(var i=0;i < orig_str.length;i++) {
        numberArray.push(i);
      }

      var orig_str_array  = orig_str.split(' ');
      var shuffled_string = '';

      for(var j=0;j<orig_str_array.length;j++)
        shuffled_string += shuffleStr(orig_str_array[j])+' ';
      $(this).html(shuffled_string);

      numberArray     = shuffle(numberArray);
      var str         = $(self).html().toString();
      var passed_time = 0;
      var countdown   = numberArray.length-1;
      var loop = setInterval(function() {

        var pos = Math.floor((Math.random()*str.length));
        var isLetter = Math.floor(Math.random()*2);

        if(str.length*interval > time) {
          str = replaceAt(str,numberArray[countdown],orig_str[numberArray[countdown]]);
          countdown--;
          if(countdown == -1) clearInterval(loop);
        } else if(isLetter && str[pos] != ' ') {
          var replace_pos = Math.floor((Math.random()*letters.length));
          str = replaceAt(str,pos,letters.charAt(replace_pos));
        } else if(str[pos] != ' ') {
          var replace_pos = Math.floor((Math.random()*numbers.length));
          str = replaceAt(str,pos,numbers.charAt(replace_pos));
        }
        $(self).html(str);
        time -= interval;
      },interval);
   } 
})(jQuery);