
import pandas as pd
cars = pd.read_csv(r'C:\Users\super\Downloads\Information Visuals\cars.csv')
cars.head()
print(cars['model'])
cars.iloc[0]
cars.iloc[0, 0]
cars.iloc[:, 0]   
cars.describe()

import altair as alt
scatterplot = alt.Chart(cars).mark_circle().encode(
    x = 'displacement',
    y = 'hwy',
)
scatterplot.show()
scatterplot_colored = scatterplot.encode(color = 'class')
scatterplot_colored.show()

cars_audi = cars[cars['manufacturer'] == 'audi']
cars['mpg'] = (cars['cty'] + cars['hwy']) / 2
bar_chart = alt.Chart(cars_audi).mark_bar().encode(
    x = 'model',
    y = 'mean_mpg:Q',
)
bar_chart.show()


