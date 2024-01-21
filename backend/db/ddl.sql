CREATE TABLE IF NOT EXISTS tasks(
    id       INTEGER PRIMARY KEY,
    title    TEXT,
    number   INTEGER,
    finished BOOLEAN
);

-- Создание таблицы 1
CREATE TABLE IF NOT EXISTS table1 (
    id INTEGER PRIMARY KEY,
    value INTEGER
);

-- Создание таблицы 2
CREATE TABLE IF NOT EXISTS table2 (
    id INTEGER PRIMARY KEY,
    value INTEGER
);
