#!/usr/bin/python
import cgi, os
import cgitb; cgitb.enable()
import facebook
import MySQLdb
import config
import json
from os import path
import PIL
from PIL import Image

print "Content-Type: text/html\n"
form = cgi.FieldStorage()
if "access_token" in form.keys():
    access_token = form['access_token'].value;
    graph = facebook.GraphAPI(access_token);
    profile = graph.get_object("me");
    my_id = profile['id'];
    if my_id == None or my_id == "":
        #illegal access, exit immeidately.
        ret = {"code":-1,"msg":"Illegal access"};
        print json.dumps(ret);
    else:
        #juicy stuff here.
        
        try: # Windows needs stdio set for binary mode.
            import msvcrt
            msvcrt.setmode (0, os.O_BINARY) # stdin  = 0
            msvcrt.setmode (1, os.O_BINARY) # stdout = 1
        except ImportError:
            pass
        
        # A nested FieldStorage instance holds the file
        fileitem = form['file']
        
        # Test if the file was uploaded
        fileitem_splitted = str(fileitem.filename).split('.')
        ext = fileitem_splitted[len(fileitem_splitted)-1]
        allowed_ext = ['png','bmp','jpg','gif']
        if fileitem.filename and ext.lower() in allowed_ext:

            #db stuff
            conn = MySQLdb.connect (host = config.DB_HOST, user = config.DB_USER, passwd = config.DB_PWD, db = config.DB_NAME)
            cursor = conn.cursor ();
            args=(my_id,ext,);
            cursor.callproc("insert_images", args=args);
            inserted_id = cursor.fetchall()[0][0]
            cursor.close();
            conn.close();

            #filename will be UID after isnerting into the database
            fn = os.path.basename(str(inserted_id) + "." + ext)
            script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in
            rel_path = "../upload/" + fn
            abs_file_path = os.path.join(script_dir, rel_path)
            open(abs_file_path, 'wb').write(fileitem.file.read())
            basewidth = 800
            img = Image.open(abs_file_path)
            (width, height) = img.size
            if width > basewidth:
                wpercent = (basewidth / float(img.size[0]))
                hsize = int((float(img.size[1]) * float(wpercent)))
                img = img.resize((basewidth, hsize), PIL.Image.ANTIALIAS)
                img.save(abs_file_path)
            message = '/upload/' + fn;
            ret = {"code":1,"msg":message,"id":inserted_id};
            print json.dumps(ret);
        else:
            ret = {"code":-1,"msg":"Illegal access"};
            print json.dumps(ret);

else:
    #illegal access, exit immediately
    ret = {"code":-1,"msg":"Illegal access"};
    print json.dumps(ret);
