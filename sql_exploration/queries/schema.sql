DROP TABLE IF EXISTS forest_data_raw;
CREATE TABLE IF NOT EXISTS forest_data_raw
(
    X DECIMAL(10,4),
    Y DECIMAL(10,4),
    RECAREANAME CHARACTER(60),
    LONGITUDE DECIMAL(10,4),
    LATITUDE DECIMAL(10,4),
    RECAREAURL CHARACTER(75),
    OPEN_SEASON_START CHARACTER(100),
    OPEN_SEASON_END CHARACTER(80),
    FORESTNAME CHARACTER(55),
    RECAREAID INTEGER,
    MARKERTYPE CHARACTER(256),
    MARKERACTIVITY CHARACTER(25),
    MARKERACTIVITYGROUP CHARACTER(25),
    RECAREADESCRIPTION CHARACTER(2100),
    RECPORTAL_UNIT_KEY INTEGER,
    FORESTORGCODE INTEGER,
    OBJECTID INTEGER NOT NULL,
    FEEDESCRIPTION CHARACTER(1100),
    OPERATIONAL_HOURS CHARACTER(970),
    RESERVATION_INFO CHARACTER(900),
    RESTRICTIONS CHARACTER(2100),
    INFRA_CN CHARACTER(100),
    SPOTLIGHTDISPLAY CHARACTER(3),
    ATTRACTIONDISPLAY CHARACTER(3),
    ACCESSIBILITY CHARACTER(2000),
    OPENSTATUS CHARACTER(25),
    PRIMARY KEY(OBJECTID)
);

SELECT * from forest_data_raw;