import numpy as np
import pandas as pd
from bs4 import BeautifulSoup
import requests
import re

url="https://en.wikipedia.org/wiki/List_of_Academy_Award-winning_films"
#get,post,patch/put,delete
req=requests.get(url)

soup=BeautifulSoup(req.content)

soup.prettify()

Film=[]
Year=[]
Award=[]
Nomination=[]
count=0
for i in soup.findAll('td'):
    i=re.sub('^<td>.*">|<td>|</td>|<.*>|\n',"",str(i))
    if count==0:
        Film.append(i)
        count+=1
    elif count==1:
        Year.append(i)
        count+=1
    elif count==2:
        Award.append(i)
        count+=1
    else:
        count=0
        Nomination.append(i)

oscar=pd.DataFrame({"Film":Film[:1360],"Year":Year[:1360],"Award":Award[:1360],"Nomination":Nomination[:1360]})

oscar.to_csv('data/data.csv')