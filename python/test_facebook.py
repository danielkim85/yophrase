#!/usr/bin/python
import cgi, os
import cgitb; cgitb.enable()
import facebook
import MySQLdb


print "Content-Type: text/html\n"
form = cgi.FieldStorage()
if "access_token" in form.keys():
    access_token = form['access_token'].value;
    graph = facebook.GraphAPI(access_token);
    try:
    	profile = graph.get_object("me");
    	my_id = profile['id'];
    	print my_id
    except:
    	print "illegal token"
else:
    print "illegal access"
    
