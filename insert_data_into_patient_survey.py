#!/usr/bin/python
# -*- coding: utf-8 -*-

import psycopg2
import sys
import pandas as pd
from sodapy import Socrata
import json
from pprint import pprint
import sqlalchemy

# Connection strings
from db_connection import *

try:
    SQLALCHEMY_DATABASE_URI = '%s+%s://%s:%s@%s:%s/%s' % (DB_TYPE, DB_DRIVER,
                                                          DB_USER, DB_PASS,
                                                          DB_HOST, DB_PORT,
                                                          DB_NAME)
    # Create Engine
    ENGINE = sqlalchemy.create_engine(
        SQLALCHEMY_DATABASE_URI, pool_size=POOL_SIZE, max_overflow=0)

    print("Connecting to DB... ", end="")
    # Create HTTP Client
    client = Socrata("data.medicare.gov", "Ej5oTGjip0RAtXjHBP6IiVPtd")

    print("done.")

    print("Fetching data... ", end="")
    # Get HCAHPS Data
    results = client.get("rmgi-5fhi", limit=100000)

    print("done.")

    # Convert to Pandas DataFrame
    results_df = pd.DataFrame.from_records(results)

    print("Inserting data into DB... ", end="")

    # Insert the converted data into SQL
    results_df.to_sql(
        TABLENAME,
        ENGINE,
        if_exists='append',
        index=False,
        dtype={'location': sqlalchemy.types.JSON})

    print("done.")

    # Program done
    print("\nProgram finished... exiting.")

except Exception as e:
    print(e)