#!/usr/bin/python
import cgi, os
import cgitb; cgitb.enable()
from imgurpython import ImgurClient

print "Content-Type: text/html\n"

def get_input(string):
    ''' Get input from console regardless of python 2 or 3 '''
    try:
        return raw_input(string)
    except:
        return input(string)

def get_config():
    ''' Create a config parser for reading INI files '''
    try:
        import ConfigParser
        return ConfigParser.ConfigParser()
    except:
        import configparser
        
def authenticate(pin):
    # Get client ID and secret from auth.ini
    config = get_config()
    config.read('auth.ini')
    client_id = config.get('credentials', 'client_id')
    client_secret = config.get('credentials', 'client_secret')

    client = ImgurClient(client_id, client_secret)
    # ... redirect user to `authorization_url`, obtain pin (or code or token) ...
    credentials = client.authorize(pin, 'pin')
    client.set_user_auth(credentials['access_token'], credentials['refresh_token'])

    print "Authentication successful! Here are the details:<br />"
    print "   Access token:  {0}<br />".format(credentials['access_token'])
    print "   Refresh token: {0}<br />".format(credentials['refresh_token'])

    return client



form = cgi.FieldStorage()

if 'pin' not in form:
    # Get client ID and secret from auth.ini
    config = get_config()
    config.read('auth.ini')
    client_id = config.get('credentials', 'client_id')
    client_secret = config.get('credentials', 'client_secret')
    
    client = ImgurClient(client_id, client_secret)
    
    # Authorization flow, pin example (see docs for other auth types)
    authorization_url = client.get_auth_url('pin')
    print authorization_url
else:
    pin = form['pin'].value;
    print 'authenticating with pin ' + pin + "<br />";
    authenticate(pin);


