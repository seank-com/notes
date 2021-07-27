
// <td align=center>
//	<table cellspacing=0>
//		<tr><td class=wo>4</to><td class=fo>.5</td></tr>
//		<tr><td class=wm>+ 1</td><td class=fm>.1</td></tr>
//		<tr><td class=wo>&nbsp;</td><td class=fo>&nbsp;</td></tr>
//	</table>
// </td> 

$(document).ready(function() {

  $('#layout20').tmpl(null).appendTo('#worksheet');
  $('td').each(function(idx, el) {
    $('#vap').tmpl({
      wpop1: '5',
      fpop1: '.02',
      wpop2: '5',
      fpop2: '.02',
      wpans: '&nbsp;',
      fpans: '&nbsp;'
    }).appendTo(el);
  });

  $('#worksheet').click(function(){
    alert('you clicked!');    
  });
});
