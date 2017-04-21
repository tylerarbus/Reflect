module.exports = db => (
  db.query('CREATE TABLE IF NOT EXISTS users(\
    user_id SERIAL PRIMARY KEY,\
    email VARCHAR(30) NOT NULL UNIQUE,\
    first_name VARCHAR(20) NOT NULL,\
    last_name VARCHAR(20) NOT NULL,\
    password VARCHAR(200) NOT NULL,\
    phone VARCHAR(20) NOT NULL,\
    phone_verified BOOLEAN DEFAULT false,\
    created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,\
    modified TIMESTAMPTZ\
    );')
  .then(() => (
    db.query('CREATE TABLE IF NOT EXISTS call_preferences(\
      call_preferences_id SERIAL PRIMARY KEY,\
      user_id INT NOT NULL REFERENCES users ON DELETE CASCADE,\
      time_of_day VARCHAR(20),\
      created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,\
      modified TIMESTAMPTZ\
      );')
  ))
  .then(() => (
    db.query('CREATE TABLE IF NOT EXISTS entries(\
      entry_id SERIAL PRIMARY KEY,\
      user_id INT NOT NULL REFERENCES users ON DELETE CASCADE,\
      call_id VARCHAR(50) NOT NULL UNIQUE,\
      created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,\
      modified TIMESTAMPTZ\
      );')
  ))
  .then(() => (
    db.query('CREATE TABLE IF NOT EXISTS audio(\
      audio_id SERIAL PRIMARY KEY,\
      entry_id INT NOT NULL REFERENCES entries ON DELETE CASCADE,\
      remote_path VARCHAR(150) NOT NULL,\
      local_path VARCHAR(150),\
      is_processed BOOLEAN DEFAULT false,\
      is_downloaded BOOLEAN DEFAULT false,\
      recording_id VARCHAR(50) UNIQUE NOT NULL,\
      date_file_created TIMESTAMPTZ NOT NULL,\
      created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,\
      modified TIMESTAMPTZ\
      );')
  ))
  .then(() => (
    db.query('CREATE TABLE IF NOT EXISTS entry_text(\
      entry_text_id SERIAL PRIMARY KEY,\
      entry_id INT NOT NULL REFERENCES entries ON DELETE CASCADE,\
      text TEXT,\
      is_analyzed BOOLEAN DEFAULT false,\
      created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,\
      modified TIMESTAMPTZ\
      );')
  ))
  .then(() => (
    db.query('CREATE TABLE IF NOT EXISTS entry_nlp(\
      entry_nlp_id SERIAL PRIMARY KEY,\
      entry_id INT NOT NULL REFERENCES entries ON DELETE CASCADE,\
      keywords JSONB,\
      entities JSONB,\
      sentiment REAL,\
      emotions JSONB,\
      created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,\
      modified TIMESTAMPTZ\
      );')
  ))
  .then(() => (
    db.query('CREATE TABLE IF NOT EXISTS call_logs(\
      call_log_id SERIAL PRIMARY KEY,\
      user_id INT NOT NULL,\
      call_sid VARCHAR(50) NOT NULL,\
      phone VARCHAR(50) NOT NULL,\
      duration VARCHAR(10),\
      type VARCHAR(20) NOT NULL,\
      status VARCHAR(20) NOT NULL,\
      created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,\
      modified TIMESTAMPTZ\
      );')
  ))
  .then(() => (
    db.query('CREATE OR REPLACE FUNCTION update_modified_column()\
      RETURNS TRIGGER AS $$\
      BEGIN\
         NEW.modified = now(); \
         RETURN NEW;\
      END;\
      $$ language "plpgsql";')
    ))
  .then(() => (
    db.query('DROP TRIGGER IF EXISTS update_users_changetimestamp ON users')
  ))
  .then(() => (
    db.query('DROP TRIGGER IF EXISTS update_call_preferences_changetimestamp ON call_preferences')
  ))
  .then(() => (
    db.query('DROP TRIGGER IF EXISTS update_audio_changetimestamp ON audio')
  ))
  .then(() => (
    db.query('DROP TRIGGER IF EXISTS update_entries_changetimestamp ON entries')
  ))
  .then(() => (
    db.query('DROP TRIGGER IF EXISTS update_entry_text_changetimestamp ON entry_text')
  ))
  .then(() => (
    db.query('DROP TRIGGER IF EXISTS update_entry_nlp_changetimestamp ON entry_nlp')
  ))
  .then(() => (
    db.query('DROP TRIGGER IF EXISTS update_call_logs_changetimestamp ON call_logs')
  ))
  .then(() => (
    db.query('CREATE TRIGGER update_users_changetimestamp BEFORE UPDATE\
      ON users FOR EACH ROW EXECUTE PROCEDURE \
      update_modified_column();')
  ))
  .then(() => (
    db.query('CREATE TRIGGER update_call_preferences_changetimestamp BEFORE UPDATE\
      ON call_preferences FOR EACH ROW EXECUTE PROCEDURE \
      update_modified_column();')
  ))
  .then(() => (
    db.query('CREATE TRIGGER update_audio_changetimestamp BEFORE UPDATE\
      ON audio FOR EACH ROW EXECUTE PROCEDURE \
      update_modified_column();')
  ))
  .then(() => (
    db.query('CREATE TRIGGER update_entries_changetimestamp BEFORE UPDATE\
      ON entries FOR EACH ROW EXECUTE PROCEDURE \
      update_modified_column();')
  ))
  .then(() => (
    db.query('CREATE TRIGGER update_entry_text_changetimestamp BEFORE UPDATE\
      ON entry_text FOR EACH ROW EXECUTE PROCEDURE \
      update_modified_column();')
  ))
  .then(() => (
    db.query('CREATE TRIGGER update_entry_nlp_changetimestamp BEFORE UPDATE\
      ON entry_nlp FOR EACH ROW EXECUTE PROCEDURE \
      update_modified_column();')
  ))
  .then(() => (
    db.query('CREATE TRIGGER update_call_logs_changetimestamp BEFORE UPDATE\
      ON call_logs FOR EACH ROW EXECUTE PROCEDURE \
      update_modified_column();')
  ))
);
