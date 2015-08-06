#!/usr/bin/python
import cgi, os
import cgitb; cgitb.enable()
import PIL
from PIL import Image

size = 128, 128
script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in
abs_file_path = os.path.join(script_dir, 'test.jpg')
img = Image.open(abs_file_path)
(width, height) = img.size
img = img.resize((128, 128), PIL.Image.ANTIALIAS)

img.save('resized_image.jpg');
print "Content-Type: text/html\n"
print width	