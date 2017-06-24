import requests
from bs4 import BeautifulSoup as bs
import json
import sys
import ast
from io import StringIO

class Scrapper(object):
    """docstring for Scrapper."""
    def __init__(self, username,password):
        super(Scrapper, self).__init__()
        self.session = requests.Session()
        self.session.headers.update({'Referer':'https://www.instagram.com/'})
        self.req = self.session.get('https://www.instagram.com/')
        self.session.headers.update({'X-CSRFToken':self.req.cookies['csrftoken']})
        self.username = username
        self.password = password
        self.login()

    def login(self):
        login_data = {'username': self.username, 'password': self.password}
        login = self.session.post('https://www.instagram.com/accounts/login/ajax/', data=login_data, allow_redirects=True)
        self.session.headers.update({'X-CSRFToken': login.cookies['csrftoken']})
        self.cookies = login.cookies
        self.resp = self.session.get("https://www.instagram.com/" + self.username)
        data = self.login_data()
        self.clean_up(data)

    def login_data(self):
        shared_data = self.resp.text.split("window._sharedData = ")[1].split(";</script>")[0]
        json_data = shared_data
        return json_data

    def clean_up(self,data):
        self.extracted_data = unicode(ast.literal_eval(json.dumps(data)))
        json_data = json.loads(self.extracted_data)
        print(json_data["entry_data"]["ProfilePage"][0]["user"]["biography"])
        print(json_data["entry_data"]["ProfilePage"][0]["user"]["full_name"])
        print(json_data["entry_data"]["ProfilePage"][0]["user"]["profile_pic_url_hd"])
        print(json_data["entry_data"]["ProfilePage"][0]["user"]["username"])
        print(json_data["entry_data"]["ProfilePage"][0]["user"]["followed_by"]["count"])
        print(json_data["entry_data"]["ProfilePage"][0]["user"]["follows"]["count"])
        for node in json_data["entry_data"]["ProfilePage"][0]["user"]["media"]["nodes"]:
            print(node["date"])
            print(node["likes"]["count"])

username = sys.argv[1]
password = sys.argv[2]

scrapper = Scrapper(username,password)

"""


"""
