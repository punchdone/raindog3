mapboxgl.accessToken = 'pk.eyJ1IjoicHVuY2hkb25lIiwiYSI6ImNrMHdveGE2MTAydDkzbnBpa2RnenJndHcifQ.Uc2a_g_CWwGsUPD8uLa6ew';

	var map = new mapboxgl.Map({
	  container: 'map',
	  style: 'mapbox://styles/mapbox/light-v10',
	  center: project.coordinates,
	  zoom: 7
	});

	  // create a HTML element for our project location/marker
	  var el = document.createElement('div');
	  el.className = 'marker';

	  // make a marker for our location and add to the map
	  new mapboxgl.Marker(el)
		.setLngLat(project.coordinates)
  		.setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
		.setHTML('<h3>' + project.title + '</h3><p>' + project.location + '</p>'))
		.addTo(map);

// Toggle edit room form
