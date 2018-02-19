// loading in + displaying mayan site dataset (+ subsets)
// import data from maya_sites_cleaned fusion table
var mayaSitesFromFT = ee.FeatureCollection('ft:1OZgpEphIkm4qcVCKcN4tkPJMG-Djq8YT4zaKD0ll');
Map.addLayer(mayaSitesFromFT, {color: '90002C'}, 'all maya sites');

// sites with rank 1
var sitesWithRank1 = mayaSitesFromFT.filter(ee.Filter.eq('rank', 1));
Map.addLayer(sitesWithRank1, {color: 'DA2D37'}, 'all maya sites with rank 1');

// sites with rank 2
var sitesWithRank2 = mayaSitesFromFT.filter(ee.Filter.eq('rank', 2));
Map.addLayer(sitesWithRank2, {color: 'FFA500'}, 'all maya sites with rank 2');

// sites with rank 3
var sitesWithRank3 = mayaSitesFromFT.filter(ee.Filter.eq('rank', 3));
Map.addLayer(sitesWithRank3, {color: '43B297'}, 'all maya sites with rank 3');

// sites with rank 4
var sitesWithRank4 = mayaSitesFromFT.filter(ee.Filter.eq('rank', 4));
Map.addLayer(sitesWithRank4, {color: '3A91E4'}, 'all maya sites with rank 4');

// sites with rank 5
var sitesWithRank5 = mayaSitesFromFT.filter(ee.Filter.eq('rank', 5));
Map.addLayer(sitesWithRank5, {color: '7C54C7'}, 'all maya sites with rank 5');

// all sites, excluding sites with rank 1
var sitesExcludingRank1 = mayaSitesFromFT.filter(ee.Filter.neq('rank', 1));
Map.addLayer(sitesExcludingRank1, {color: 'B0E0E6'}, 'all maya sites excl rank 1');


// loading in + displaying landsat 8 toa reflectance images containing a given coordinate point
// to find the coordinates for a particular site, click on the 'Inspector' tab and then click the point
var point = ee.Geometry.Point(-88.5686,20.68287);                           // edit these coordinates to get images from the vicinity of a different site (current example is chichen itza)
var start = ee.Date('2017-01-01');                                          // edit here to change the start date for images
var finish = ee.Date('2018-02-14');                                         // edit here to change the end date for images

// returns all images in the dataset that include 'point' taken between 'start' and 'finish'
var siteImages = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')              // edit here to change the dataset being searched
  .filterBounds(point)
  .filterDate(start, finish);

// prints list of all images satisfying temporal and geographic conditions to console
// you can inspect the output to find out how many images (listed under 'features') fulfill the conditions
// you can also expand any individual image to find out more information about it
// you can use the 'id' field for an image to display just that single image on the map
// you can expand the 'properties' field to find various properties you might want to filter or sort on (e.g. 'CLOUD_COVER')
print(siteImages);

// example of sorting + filtering to find a specific image
// from the printed list of images, choose one with least cloud cover
var sortedCloudCover = siteImages.sort('CLOUD_COVER');
var leastCloudCoverImage = ee.Image(sortedCloudCover.first());

// center map around the given coordinates
Map.setCenter(-88.5686,20.68287);                                           // edit these coordinates to center map around a different point/site

// set visualization parameters for map images
// for true-color composite, use landsat 8 bands 'B4', 'B3', 'B2' for rgb
var visParams = {bands: ['B4', 'B3', 'B2'], max: 0.3};                      // edit here to change the bands being visualized

// to display a particular image given the image id, edit the next 2 lines
var singleImage = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_019046_20170122'); // change the image id here to the id of whatever image you want to view
Map.addLayer(leastCloudCoverImage, visParams, 'single image');              // change 'leastCloudCoverImage' to 'singleImage' to view a specific image
Map.addLayer(siteImages, visParams, 'all site images');