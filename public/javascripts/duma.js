var reloadContent = function(e) {
  e.preventDefault();
  jQuery('#panel').fadeOut('slow', function() {
    var that = this;
    jQuery.get('/random.json', function(res) {
      jQuery('#panel').html(res.content).fadeIn('slow');
      history.pushState('', '', '/'+res.human_id+'.html');
    }, 'json')
  });
};

jQuery(function() {
  jQuery("#changePanel").click(reloadContent);
});

/*
 * Google Analytics
 */
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-34763905-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') +
            '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();