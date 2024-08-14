---
---

## Introduction

To get the anomaly of the `MAX` streamflow data in a hydrobasin, we will continue working on the csv file we get during our raster to plygon conversion step

### Goal

## Python Scripting

### Setup

We only need the pandas library to work with `.csv` files 

```python
import pandas as pd

nc_path = r"./hybas_lev05_Streamflow_tmax.csv"

data = pd.read_csv(nc_path)

```

### Step 1


```python
data["StdTime"] = pd.to_datetime(data["StdTime"])
data.set_index('StdTime', inplace=True)

```

```python
data['month'] = data.index.month
data['year'] = data.index.year
# Filter the data for the years 2001 to 2024 (or beyond your current maximum date)
data = data[data.index.year <= 2024]
```



### Step 2 
```python
# Calculate climatology (mean temperature for each month over years 2001 to 2020 for each PFAF_ID)
climatology_2001_to_2020 = data[data.index.year.isin(range(2001, 2021))].groupby(['PFAF_ID', 'month'])['MAX'].mean().rename('climatology_mean')
```
1. **`data[data.index.year.isin(range(2001, 2021))]`**: This part filters our data frame to include only the rows where the year in the index is within the range from 2001 to 2020. The `isin(range(2001, 2021))` function checks if the year part of the index is within this range.

2. **`.groupby(['PFAF_ID', 'month'])`**: After filtering, we grouped by the columns `PFAF_ID` and `month`. This means that the subsequent operations will be performed on each group of rows that have the same `PFAF_ID` and `month`.

3. **`['MAX'].mean()`**: For each group, the code calculates the mean of the values in the `MAX` column.

4. **`.rename('climatology_mean')`**: The resulting Series, which contains the mean values, is renamed to `climatology_mean`.


### Step 3
Now, let's merge the climatology we just calculated back to the object `<data>`. Then to get the anomaly, simply subtract the monthly mean from the column of cells that has the maximum stream flow. 

```python 
# Merge climatology mean with the original data
data = data.merge(climatology_2001_to_2020, left_on=['PFAF_ID', 'month'], right_index=True, suffixes=('', '_clim'))

# Calculate anomaly
data['anomaly'] = data['MAX'] - data['climatology_mean']
```

Now the dataset should look as the following, 
```terminal 
             PFAF_ID      Variable          MAX         climatology_mean  anomaly
2001-01-31     61564  ... Streamflow_tavg    53.298950         66.873812 -13.574861
2002-01-31     61564  ... Streamflow_tavg    69.457275         66.873812   2.583464
2003-01-31     61564  ... Streamflow_tavg    61.097664         66.873812  -5.776148
2004-01-31     61564  ... Streamflow_tavg    57.528519         66.873812  -9.345293
2005-01-31     61564  ... Streamflow_tavg    64.865562         66.873812  -2.008249
2019-12-31     67208  ... Streamflow_tavg  1349.599243       1814.002460 -464.403217
2020-12-31     67208  ... Streamflow_tavg  1546.011719       1814.002460 -267.990741
2021-12-31     67208  ... Streamflow_tavg  2432.778564       1814.002460  618.776105
2022-12-31     67208  ... Streamflow_tavg  1480.862183       1814.002460 -333.140277
2023-12-31     67208  ... Streamflow_tavg  1363.781982       1814.002460 -450.220477

[41676 rows x 10 columns]
```
And now we could move on appending it to our polygon files layer.