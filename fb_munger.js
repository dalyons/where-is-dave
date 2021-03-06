;(function(window) {
  var window = window, extraOwnerIds = [];
  
  function fetchLocationImages(opts, onComplete) {
    var access_token = opts.token, from = opts.from, to = opts.to;
    
    var url = buildFQLUrl(access_token, from, to);
    
    $.get(url).success(function(json){
      var results = extractResults(json);
      var photos = results.photos;
      
      //merge place info into photos
      mergePlaceInfo(photos, results.places);
      
      //handle backdates
      reconcileBackdates(photos);
      
      //sort by timestamp
      photos = _.sortBy(photos, function(p) { return p.created });
      
      //remove all the crap
      photos = standardize(photos);
      
      onComplete(photos);
    });
  }

  function mergePlaceInfo(photos, places) {
    var coordMap = {};
    _.each(places, function(place){
      coordMap[place.page_id.toString()] = place.geometry.coordinates;
    });
    _.each(photos, function(photo){
      photo.coords = coordMap[photo.place_id];
    });
  }

  function reconcileBackdates(photos) {
    _.each(photos, function(photo) {
      if (photo.backdated_time) 
        photo.created = photo.backdated_time;
    });
  }

  function standardize(photos) {
    var standardizedPhotos = 
      _.map(photos, function(photo) {
        return {
          "id": photo.object_id,
          "timestamp": photo.created,
          "coordinates": photo.coords,
          "description": photo.caption,
          "thumbnail": photo.src,
          "src": photo.src_big,
          "src_big": photo.images[0] && photo.images[0].source
        }
    });
    return _.filter(standardizedPhotos, function(photo) {
      return photo.coordinates;
    })
  }


  function buildFQLUrl(access_token, from, to) {
    //var extraOwnerIds = [424460880913112];1339210800
    
    //handling Facebooks backdates is such a PITA. Why not just set the date correctly in the first place FB?
    var dateFilter = '';
    if (from) 
      dateFilter = dateFilter + ' and (backdated_time > ' + (from / 1000).toString() +
                   ' or (not backdated_time and created > ' + (from / 1000).toString() + ')) ';
    if (to)
      dateFilter = dateFilter + ' and (backdated_time < ' + (to / 1000).toString() +
                   ' or (not backdated_time and created < ' + (to / 1000).toString() + ')) ';
    
    var query = JSON.stringify({
      "photos": "select object_id, owner, caption, backdated_time, created, src_small, src, src_big, images, place_id  FROM photo WHERE (object_id IN (SELECT object_id FROM photo_tag WHERE subject=me()) or owner = me() or owner in (" + extraOwnerIds.toString() + ")) " + dateFilter + " and place_id <> '' order by created",
      "places": "select page_id, geometry, name, type from place where page_id in (select place_id from #photos)" 
    });

    console.log(query)
    var url = 'https://graph.facebook.com/fql?q=' + escape(query);
    return url + '&access_token=' + access_token;
  }

  function extractResults(fb_json) {
    return {
      'photos': fb_json.data[0].fql_result_set,
      'places': fb_json.data[1].fql_result_set
    };
  }


 window.FBGeoMunger = {
    fetchLocationImages: fetchLocationImages,
    extraOwnerIds: extraOwnerIds
  }
}(this.window || this));
