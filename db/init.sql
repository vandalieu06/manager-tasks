PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS "USERS" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstname" TEXT,
    "lastname" TEXT,
    "username" TEXT,
    "email" TEXT,
    "password" TEXT
);

CREATE TABLE IF NOT EXISTS "TASKS" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "state" INTEGER CHECK("state" IN (0, 1)),
    "date" TEXT, -- SQLite no tiene tipo DATE nativo, usa TEXT en formato ISO8601 'YYYY-MM-DD'
    "priority" INTEGER,
    "user_id" INTEGER,
    FOREIGN KEY("user_id") REFERENCES "USERS"("id")
);

CREATE TABLE IF NOT EXISTS "TAGS" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "color" TEXT
);

CREATE TABLE IF NOT EXISTS "TASKS_TAGS" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tasks_id" INTEGER,
    "tags_id" INTEGER,
    FOREIGN KEY("tasks_id") REFERENCES "TASKS"("id"),
    FOREIGN KEY("tags_id") REFERENCES "TAGS"("id")
);


INSERT INTO "USERS" ("firstname", "lastname", "username", "email", "password") VALUES
('Ana', 'García', 'anagarcia', 'ana.garcia@email.com', 'hashed_password_1'),
('Carlos', 'Martínez', 'carlosm', 'carlos.martinez@email.com', 'hashed_password_2'),
('Laura', 'López', 'laural', 'laura.lopez@email.com', 'hashed_password_3'),
('Miguel', 'Rodríguez', 'miguelr', 'miguel.rodriguez@email.com', 'hashed_password_4'),
('Elena', 'Fernández', 'elenaf', 'elena.fernandez@email.com', 'hashed_password_5');


INSERT INTO "TAGS" ("name", "color") VALUES
('Urgente', '#FF0000'),
('Trabajo', '#0066CC'),
('Personal', '#00CC66'),
('Estudio', '#9933FF'),
('Casa', '#FF9900'),
('Proyecto', '#CC0066'),
('Reunión', '#00CCCC');