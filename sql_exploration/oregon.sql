-- Oregon bounding box -124.566244	41.991794	-116.463504	46.292035
-- source https://anthonylouisdagostino.com/bounding-boxes-for-all-us-states/

SELECT longitude, latitude, recareaname, forestname
FROM forest_data_raw
WHERE (longitude < -116.463504 AND longitude > -124.566244) 
AND (latitude < 46.292035 AND latitude > 41.991794);