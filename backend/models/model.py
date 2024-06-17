import sqlite3
import pandas as pd

conn = sqlite3.connect(database='./backend/database/data.sqlite')


def select_buildings():
    df = pd.read_sql('''
    select building_name Название, 
    tb.type_building_name Тип,
    c2.country_name Страна,
    c.city_name Город,
    year_create 'Год создания',
    height 'Высота, м'
    from building
    join type_building tb on building.type_building_id = tb.type_building_id
    join city c on c.city_id = building.city_id
    join main.country c2 on c2.country_id = c.country_id
    ''', conn)
    return df.to_dict(orient='records')
