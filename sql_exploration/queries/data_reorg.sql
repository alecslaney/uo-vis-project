DROP TABLE IF EXISTS forest_data_filter;

CREATE TABLE forest_data_filter AS
SELECT 
	objectid AS "id",
	recareaname AS "rec_area_name",
	forestname AS "forest_name",
	latitude AS "lat",
	longitude AS "long",
	markeractivitygroup AS "activity_group",
	markeractivity AS "activity",
	openstatus AS "status",
	operational_hours AS "hours",
	reservation_info AS "res_info",
	feedescription as "fees",
	restrictions,
	accessibility AS "accessib",
	recareaurl AS "url",
	recareadescription AS "descr",
	open_season_start,
	open_season_end,
	recareaid AS "rec_area_id",
	recportal_unit_key,
	forestorgcode AS "forest_org_code"

FROM forest_data_raw
ORDER BY "id" ASC;

SELECT * FROM forest_data_filter;