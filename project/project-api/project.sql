
\echo 'Delete and recreate project db?';
\prompt 'Return for yes or control-C to cancel > ';

DROP DATABASE IF EXISTS project;
CREATE DATABASE project;
\connect project;

\i project-schema.sql;

