import sqlite3

def init_db():
    conn = sqlite3.connect('events.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS events
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  name TEXT NOT NULL,
                  date TEXT NOT NULL,
                  location TEXT NOT NULL,
                  description TEXT)''')
    conn.commit()
    conn.close()

def save_event(name, date, location, description):
    conn = sqlite3.connect('events.db')
    c = conn.cursor()
    c.execute("INSERT INTO events (name, date, location, description) VALUES (?, ?, ?, ?)",
              (name, date, location, description))
    conn.commit()
    conn.close()

def get_events():
    conn = sqlite3.connect('events.db')
    c = conn.cursor()
    c.execute("SELECT * FROM events ORDER BY date DESC LIMIT 10")
    events = c.fetchall()
    conn.close()
    return events

if __name__ == "__main__":
    init_db()
