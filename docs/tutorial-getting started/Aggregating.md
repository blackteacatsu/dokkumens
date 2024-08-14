---
title: Aggregating multiple netCDF files
sidebar_position: 3
---

## Introduction
From time to time, there is a chance that your netCDF files are served according to a certain time increment, ex. on daily or a monthly basis, etc. This chapter will walk through how to consolidate multiple netCDF files along the time dimension.

## Preparation
```text title="~\wkdict\nc_files"
nc files
├── LIS_HIST_20230101.nc 
├── LIS_HIST_20230102.nc
├── LIS_HIST_20230103.nc
├── LIS_HIST_20230104.nc
├── LIS_HIST_20230105.nc
├── LIS_HIST_20230106.nc
├── ...
└── LIS_HIST_20230131.nc
```

Here is our working directory for this tutorial, where we store data from January 2023, which are written on a daily basis. Reading ` LIS_HIST_20230101.nc ` gives the following information about this dataset. Likewise all the other datasets under this directory reads in the same format, and the only difference is where ``

```text
<xarray.Dataset>
Dimensions:           (north_south: 540, east_west: 660, time: 1,
                       SoilMoist_profiles: 4, SoilTemp_profiles: 4)
Coordinates:
  * time              (time) datetime64[ns] 2023-01-01
  * north_south       (north_south) float64 -21.0 -20.95 -20.9 ... 5.9 5.95 6.0
  * east_west         (east_west) float64 -82.0 -81.95 -81.9 ... -49.05 -49.0
Dimensions without coordinates: SoilMoist_profiles, SoilTemp_profiles
Data variables: (12/32)
    lat               (north_south, east_west) float32 ...
    lon               (north_south, east_west) float32 ...
    Swnet_tavg        (north_south, east_west) float32 ...
    Lwnet_tavg        (north_south, east_west) float32 ...
    Qle_tavg          (north_south, east_west) float32 ...
    Qh_tavg           (north_south, east_west) float32 ...
    ...                ...
    Qair_f_tavg       (north_south, east_west) float32 ...
    Psurf_f_tavg      (north_south, east_west) float32 ...
    SWdown_f_tavg     (north_south, east_west) float32 ...
    LWdown_f_tavg     (north_south, east_west) float32 ...
    LAI_inst          (north_south, east_west) float32 ...
    Greenness_inst    (north_south, east_west) float32 ...
Attributes: (12/15)
    missing_value:           -9999.0
    NUM_SOIL_LAYERS:         4
    SOIL_LAYER_THICKNESSES:  [ 10.        30.000002  60.000004 100.      ]
    title:                   LIS land surface model output
    institution:             NASA GSFC
    source:                  
    ...                      ...
    comment:                 website: http://lis.gsfc.nasa.gov/
    MAP_PROJECTION:          EQUIDISTANT CYLINDRICAL
    SOUTH_WEST_CORNER_LAT:   -20.975
    SOUTH_WEST_CORNER_LON:   -81.975
    DX:                      0.05
    DY:                      0.05
```

## Python Setup
Our goal for the following 


### Initialization

This workflow below will uses the 

```python title="main"
import xarray as xr
import os 
```

### Workflow
```python

os.path.join("~\...\wkdict\nc_files\LIS_HIST_*.nc")

nc_join = xarray.open_mfdataset()

nc_join.to_netcdf("LIS_HIST_2023_January.nc")

```

checking
```python
ds = xarray.open_dataset("~\...\wkdict\nc_files\LIS_HIST_2023_January.nc")
print(ds)
```
Now the time dimension should holds data from 

```text
<xarray.Dataset>
Dimensions:           (time: 31, north_south: 540, east_west: 660,
                       SoilMoist_profiles: 4, SoilTemp_profiles: 4)
Coordinates:
  * time              (time) datetime64[ns] 2023-01-01 2023-01-02 ... 2023-01-31
  * north_south       (north_south) float64 -21.0 -20.95 -20.9 ... 5.9 5.95 6.0
  * east_west         (east_west) float64 -82.0 -81.95 -81.9 ... -49.05 -49.0
Dimensions without coordinates: SoilMoist_profiles, SoilTemp_profiles
Data variables: (12/32)
    lat               (time, north_south, east_west) float32 ...
    lon               (time, north_south, east_west) float32 ...
    Swnet_tavg        (time, north_south, east_west) float32 ...
    Lwnet_tavg        (time, north_south, east_west) float32 ...
    Qle_tavg          (time, north_south, east_west) float32 ...
    Qh_tavg           (time, north_south, east_west) float32 ...
    ...                ...
    Qair_f_tavg       (time, north_south, east_west) float32 ...
    Psurf_f_tavg      (time, north_south, east_west) float32 ...
    SWdown_f_tavg     (time, north_south, east_west) float32 ...
    LWdown_f_tavg     (time, north_south, east_west) float32 ...
    LAI_inst          (time, north_south, east_west) float32 ...
    Greenness_inst    (time, north_south, east_west) float32 ...
Attributes: (12/15)
    missing_value:           -9999.0
    NUM_SOIL_LAYERS:         4
    SOIL_LAYER_THICKNESSES:  [ 10.        30.000002  60.000004 100.      ]
    title:                   LIS land surface model output
    institution:             NASA GSFC
    source:                  
    ...                      ...
    comment:                 website: http://lis.gsfc.nasa.gov/
    MAP_PROJECTION:          EQUIDISTANT CYLINDRICAL
    SOUTH_WEST_CORNER_LAT:   -20.975
    SOUTH_WEST_CORNER_LON:   -81.975
    DX:                      0.05
    DY:                      0.05
```
And now the time dimensions has 31 entry, and they ranges in the form of 2023-01-01 2023-01-02 ... 2023-01-31