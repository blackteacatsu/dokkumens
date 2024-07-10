# Introduction to NetCDF Files & Python


This tutorial explains how to read NetCDF (.nc) files using python libraries.

## Reading NetCDF files using the Xarray

### install libraries

Inside your machines's terminal type

```python
pip install xarray
```

### reading NetCDF files using python

```python
import xarray as xr

data_set_path = ~\...\example.nc

data = xr.opendataset(data_set_path)

data # call the dataset which is currently store in RAM
```

The output should looks like the following

## Reading NetCDF files using NetCDF 
In your terminal paste the following command

```terminal
pip install netcdf
```

