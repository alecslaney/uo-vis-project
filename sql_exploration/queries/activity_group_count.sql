DROP TABLE IF EXISTS activity_group_count;
CREATE TABLE activity_group_count AS
SELECT 
	activity_group,
	COUNT(activity_group) as "Count"
FROM forest_data_filter
GROUP BY activity_group
ORDER BY "Count" DESC;

SELECT * FROM activity_group_count;