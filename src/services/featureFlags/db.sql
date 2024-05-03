CREATE TABLE "public".app
(
 app_id           uuid NOT NULL,
 public_code      varchar(50) NOT NULL,
 abbreviated_name varchar(200) NOT NULL,
 CONSTRAINT "app_pk" PRIMARY KEY (app_id)
);

CREATE TABLE "public".business_unit
(
 bunit_id         uuid NOT NULL,
 public_code      varchar(50) NOT NULL,
 abbreviated_name varchar(200) NOT NULL,
 CONSTRAINT "business_unit_pk" PRIMARY KEY (bunit_id)
);


CREATE TABLE "public".flag_instance
(
 instance_id  uuid NOT NULL,
 app_id       uuid NOT NULL,
 bunit_id     uuid NOT NULL,
 CONSTRAINT "flag_instance_pk" PRIMARY KEY (instance_id),
 CONSTRAINT "flag_instance_fk_app" FOREIGN KEY (app_id) REFERENCES app (app_id),
 CONSTRAINT "flag_instance_fk_bunit" FOREIGN KEY (bunit_id) REFERENCES business_unit (bunit_id)
);

CREATE INDEX FK_1 ON "public".flag_instance
(
 app_id
);

CREATE INDEX FK_1 ON "public".flag_instance
(
 bunit_id
);


CREATE TABLE "public".feature_flag_personas
(
 flag_id varchar(50) NOT NULL,
 scope      varchar(50) NOT NULL,
 category      varchar(50) NOT NULL,
 product      varchar(50) NOT NULL,
 is_production    boolean NOT NULL,
 public_code      varchar(50) NOT NULL,
 abbreviated_name varchar(200) NOT NULL,
 description_use  varchar(1000) NOT NULL,
 value            boolean NOT NULL,
 instance_id     uuid NOT NULL,
 CONSTRAINT "feature_flag_personas_pk" PRIMARY KEY (flag_id),
 CONSTRAINT "feature_flag_personas_fk_instance" FOREIGN KEY (instance_id) REFERENCES flag_instance (instance_id)
);

CREATE INDEX FK_1 ON "public".feature_flag_personas
(
 instance_id
);