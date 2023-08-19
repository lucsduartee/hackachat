import json
import requests
import random
from bs4 import BeautifulSoup

page = requests.get("https://www.guiadacarreira.com.br/blog/guia-das-profissoes")

soup = BeautifulSoup(page.text, 'html.parser')

titles = [title.text for title in soup.find_all('h2') if 'class' not in title.attrs.keys()]

courses = []

def page_content(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.text, 'html.parser')

    try:
        print('success')
        return soup.find('div', class_='z-dynamic-content').text
    except:
        print('error')
        return None

for title in titles:
    table = soup.find(string=title).find_next('table')

    anchors = table.find_all('a')

    for anchor in anchors:
        courses.append({
            "tag": title,
            "tag_id": titles.index(title) + 1,
            "course": anchor.text,
            "url": anchor['href'],
            "price": random.randint(500, 1000),
            "page_content": page_content(anchor['href'])
        })

with open("data.json", "w") as file:
    json.dump(courses, file, ensure_ascii=False, indent=4)