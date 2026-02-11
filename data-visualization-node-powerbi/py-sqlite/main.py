import sqlite3

import pandas as pd

conn = sqlite3.connect(
    r"C:\Users\q845332\codebase\no-ide\ai-stuff\oc-stuff\data-vis\data.db"
)


def load_all_tables(conn):
    tables = {}
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type = 'table';")
    table_names = cursor.fetchall()

    for table_name in table_names:
        table_name = table_name[0]
        tables[table_name] = pd.read_sql_query(f"SELECT * FROM {table_name}", conn)

    return tables


tables = load_all_tables(conn)
print(tables["sales_data"].head())

# df_sales_data = pd.read_sql("SELECT * FROM sales_data", conn)
# df_sales_data
conn.close()
