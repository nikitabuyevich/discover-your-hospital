#!/usr/bin/python
# -*- coding: utf-8 -*-

import psycopg2
import sys
import sqlalchemy
import pandas as pd
import json

from sodapy import Socrata
from pprint import pprint
from sys import argv

# Connection strings
from db_connection import *

try:
    SQLALCHEMY_DATABASE_URI = '%s+%s://%s:%s@%s:%s/%s' % (DB_TYPE, DB_DRIVER,
                                                          DB_USER, DB_PASS,
                                                          DB_HOST, DB_PORT,
                                                          DB_NAME)

    if len(sys.argv) > 1:
        limit = sys.argv[1]
    else:
        limit = "1000"

    # Create Engine
    ENGINE = sqlalchemy.create_engine(
        SQLALCHEMY_DATABASE_URI, pool_size=POOL_SIZE, max_overflow=0)

    print("Connecting to DB...", end=" ")
    # Create HTTP Client
    client = Socrata("data.medicare.gov", API_KEY)

    print("done.")

    print("Fetching data with a limit of ..." + limit, end=" ")
    # Get HCAHPS Data
    results = client.get("rmgi-5fhi", limit=limit)

    print("done.")

    # Convert to Pandas DataFrame
    results_df = pd.DataFrame.from_records(results)

    print("Inserting data into DB...", end=" ")

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