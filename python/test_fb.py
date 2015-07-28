#!/usr/bin/python

import facebook
import cgi, os
import cgitb; cgitb.enable()
import MySQLdb

data = cgi.FieldStorage();
#access_token = data['access_token'].value;
#graph = facebook.GraphAPI(access_token);
#profile = graph.get_object("me");
print "Content-Type: text/html\n"
#print profile["id"]

conn = MySQLdb.connect (host = "207.210.106.21", user = "yophrase", passwd = "d1NYaBuq", db = "yophrase")
cursor = conn.cursor ();
#cursor.execute("select current_timestamp");
args=("test1234",);
cursor.callproc("insert_images", args=args);
inserted_id = cursor.fetchall()[0][0]
cursor.close();
conn.close();
print inserted_id
