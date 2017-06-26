from src import Scrapper
import sys
import numpy as np
from sklearn.cluster import KMeans


username = sys.argv[1]
password = sys.argv[2]

scrapper = Scrapper(username,password)

np_arr = np.array(scrapper.data)

cluster = KMeans(n_clusters=3).fit(np_arr)

print(cluster.predict(np_arr))
