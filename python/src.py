import requests
from bs4 import BeautifulSoup as bs
import json

#s = requests.Session()
#res = s.get("https://www.instagram.com")

#cookies = dict(res.cookies)
#headers = {"X-CSRFToken":cookies["csrftoken"]}
#login_req = requests.post("https://www.instagram.com/accounts/login/",data = {"username":"ritik16n","password":"#Date20111995"},cookies = cookies,allow_redirects=True)
#print(login_req.text)

session = requests.Session()
session.headers.update({'Referer':'https://www.instagram.com/'})
req = session.get('https://www.instagram.com/')
session.headers.update({'X-CSRFToken':req.cookies['csrftoken']})
login_data = {'username': 'ritik16n', 'password': '#Date20111995'}
login = session.post('https://www.instagram.com/accounts/login/ajax/', data=login_data, allow_redirects=True)
session.headers.update({'X-CSRFToken': login.cookies['csrftoken']})
cookies = login.cookies
print(login.text)
resp = session.get("https://www.instagram.com/" + "ritik16n")
#print(resp.text)
shared_data = resp.text.split("window._sharedData = ")[1].split(";</script>")[0]
print(json.loads(shared_data)['entry_data']['ProfilePage'][0]['user'])
