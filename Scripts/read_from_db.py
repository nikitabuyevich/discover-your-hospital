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

    print("Connecting to DB...", end=" ")

    # Create Engine
    ENGINE = sqlalchemy.create_engine(
        SQLALCHEMY_DATABASE_URI, pool_size=POOL_SIZE, max_overflow=0)

    print("done.")

    print("Selecting data from DB...", end=" ")

    # Convert to Pandas DataFrame
    results_df = pd.read_sql_table(TABLENAME, ENGINE)

    print(results_df)

    print("done.")

    # Program done
    print("\nProgram finished... exiting.")

except Exception as e:
    print(e)