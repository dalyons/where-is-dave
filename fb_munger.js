
function fetch(access_token) {
  
}

function buildUrl(access_token) {
  var query = JSON.stringify({
    "photos": "select object_id, owner, caption, backdated_time, created, place_id  FROM photo WHERE (object_id IN (SELECT object_id FROM photo_tag WHERE subject='544095626') or owner = 544095626 or owner = 424460880913112) and created > 1339457709 and place_id <> '' order by created",
    "places": "select page_id, geometry, name, type from place where page_id in (select place_id from #photos)" 
  });
  
  var url = 'https://graph.facebook.com/fql?q=' + escape(query) + '&access_token=' + 'access_token';
}
